import { getRepository, Transaction } from "typeorm";
import messages, { pix_error } from "../../config/messages";
import { status } from "../../config/pix";
import { Pix } from "../../entity/Pix";
import { User } from "../../entity/User";
import AppError from "../../shared/error/AppError";
import { decodeKey, encodeKey } from "../../utils/pix";



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

  async pay(key: string, user: Partial<User>) {

    const keyDecoded = decodeKey(key);

    if (keyDecoded.userID === user.id) {
      throw new AppError(pix_error.RECEIVE_PIX_FROM_SAME_USER, 401);
    }

    const pixRepository = getRepository(Pix);
    const userRepository = getRepository(User);

    const requestingUser = await userRepository.findOne(
      {
        where: { id: keyDecoded.userID }
      });
    const payingUser = await userRepository.findOne({ where: { id: user.id } })

    if (payingUser?.wallet && payingUser.wallet < Number(keyDecoded.value)) {
      throw new AppError(pix_error.INSUFFICIENT_FUNDS, 401)
    }

    if (!requestingUser || !payingUser) {
      throw new AppError(pix_error.CLIENT_NOT_FOUND, 404);
    }

    payingUser.wallet = Number(payingUser?.wallet) - Number(keyDecoded.value);
    await userRepository.save(payingUser);

    requestingUser.wallet = Number(requestingUser?.wallet) + Number(keyDecoded.value);
    await userRepository.save(requestingUser);

    const pixTransaction = await pixRepository.findOne(
      {
        where: {
          id: keyDecoded.registerID,
          status: status.OPEN
        }
      }
    )

    if (!pixTransaction) throw new AppError(pix_error.INVALID_KEY, 401);

    pixTransaction.status = status.CLOSE;
    pixTransaction.payingUser = payingUser;

    await pixRepository.save(pixTransaction);

    return {msg: messages.SUCCESS.PIX.PAYMENT_SUCCESSFULLY}
  }

  async transactions(user: Partial<User>) {

    const pixRepository = getRepository(Pix);

    const pixReceived = await (
      await pixRepository.find({
        where: {
          receivingUser: user.id,
          status: status.CLOSE
        },
        relations: ['payingUser']
      })
    )

    const conditions = {
      where: {payingUser: user.id, status: status.CLOSE},
      relations: ['receivingUser']
    }

    const pixPaiyng = await ( await pixRepository.find(conditions) )
  }
}
