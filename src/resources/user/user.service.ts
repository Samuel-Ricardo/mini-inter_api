import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
//import {MD5} from "crypto-js";
import md5 from "crypto-js/md5";
import { UserSignIn } from "./DTOS/user.signin.dtos";
import { User } from "../../entity/User";
import AppError from "../../shared/error/AppError";
import auth from "../../config/auth";



export default class UserService {

  async sigin(user: UserSignIn) {
    const userRepository = getRepository(User);

    const { email, password } = user;
    const passwordHash = md5(password).toString();

    const existUser = await userRepository.findOne({ where: { email, password: passwordHash } });

    if (!existUser) {
      throw new AppError('User not found', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({
      first_name: existUser.firstName,
      last_name: existUser.lastName,
      account_number: existUser.accountNumber,
      account_digit: existUser.accountDigits,
      wallet: existUser.wallet
    }, secret, {
      subject: existUser.id,
      expiresIn
    });

    //@ts-expect-error ignora
    delete existUser.password

    return { accessT_token: token };
  }
}
