import { sign } from "jsonwebtoken";
//import {MD5} from "crypto-js";
import md5 from "crypto-js/md5";
import auth from "../../config/auth";

import AppError from "../../shared/error/AppError";
import { error } from "../../config/messages";

import { User } from "../../entity/User";
import { getRepository } from "typeorm";

import { UserSignIn } from "./DTOS/user.signin.dtos";
import { UserSignUp } from "./DTOS/user.signup.dtos";



export default class UserService {

  async sigin(user: UserSignIn) {

    console.log('Service')

    const userRepository = getRepository(User);

    console.log(user)

    const { email, password } = user;
    const passwordHash = md5(password).toString();

    const existUser = await userRepository.findOne({ where: { email, password: passwordHash } });

    const log = await userRepository.find({ where: { email } })
    console.log(log)

    console.log('')
    console.log(existUser);

    if (!existUser) {
      console.log('User não existe')
      throw new AppError(error.USER.USER_NOT_FOUND, 401);
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

    console.log(existUser);
    console.log(token)

    //@ts-expect-error ignora
    delete existUser.password

    return { access_token: token };
  }

  async signup(user: UserSignUp) {

    const userRepository = getRepository(User);

    const existUser = await userRepository.findOne({ where: { email: user.email } });

    if (existUser) { throw new AppError(error.USER.USER_ALREADY_EXISTS, 401) };

    const userData = {
      ...user,
      password: md5(user.password).toString(),
      wallet: 0,
      accountNumber: Math.floor(Math.random() * 999999),
      accountDigits: Math.floor(Math.random() * 99)
    }

    const userCreate = await userRepository.save(userData);

    const { secret, expiresIn } = auth.jwt;

    const token = sign({
      first_name: user.firstName,
      last_name: user.lastName,
      account_number: userData.accountNumber,
      account_digit: userData.accountDigits,
      wallet: userData.wallet
    }, secret, {
      subject: userCreate.id,
      expiresIn
    });

    return { accessToken: token };
  }

  async me(user: Partial<User>) {
    const userRepository = getRepository(User);
    const currentUser = await userRepository.findOne({ where: { id: user.id } });

    if (!currentUser) {
      throw new AppError(error.USER.USER_NOT_FOUND, 401)
    }

    // @ts-expect-error ignora
    delete currentUser.password;

    return currentUser;
  }
}
