import { getRepository } from "typeorm";
import { status } from "../../config/pix";
import { Pix } from "../../entity/Pix";
import { User } from "../../entity/User";
import { encodeKey } from "../../utils/pix";



export default class PixService {

  async request(value: number, user: Partial<User>) {
    const pixRepository = getRepository(Pix);
    const userRepository = getRepository(User);

    const currentUser = await userRepository.findOne({ where: { id: user.id } });

    const requestData = {
      requestingUser: currentUser,
      value,
      status: status.OPEN
    };

    const register = await pixRepository.save(requestData);

    const key = encodeKey(user.id || '', value, register.id);

    return key;
  }
}
