import { getRepository, Transaction } from "typeorm";
import messages, { pix_error } from "../../config/messages";
import { status, types } from "../../config/pix";
import { Pix } from "../../entity/Pix";
import { User } from "../../entity/User";
import AppError from "../../shared/error/AppError";
import { decodeKey, encodeKey } from "../../utils/pix";



export default class PixService {

  async request(value: number, user: Partial<User>) {
    const pixRepository = getRepository(Pix);
    const userRepository = getRepository(User);

    const currentUser = await userRepository.findOne({ where: { id: user.id } });

    console.log(currentUser);

    const requestData = {
      receivingUser: currentUser,
      value,
      status: status.OPEN
    };

    console.log('')
    console.log('REQUEST DATA')
    console.log(requestData);
    console.log('')

    const register = await pixRepository.save(requestData);

    console.log(register);


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

    console.log('')
    console.log('Payng user')
    console.log(payingUser)
    console.log('')

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

    console.log(await pixRepository.find())

    const pixReceived = await pixRepository.find({
      where: {
        receivingUser: user.id,
        status: status.CLOSE
      },
      relations: ['receivingUser']
    });


    console.log('')
    console.log('Pix Received')
    console.log(pixReceived)
    console.log('')


    const pixPaiyng = await pixRepository.find({
      where: {payingUser: user.id, status: status.CLOSE},
      relations: ['payingUser']
    });

    console.log('')
    console.log('Pix Pay')
    console.log(pixPaiyng)
    console.log('')

    const received = pixReceived.map(transaction => ({
          value: transaction.value,
          user: {
            firstName: transaction.payingUser.firstName,
            lastName: transaction.payingUser.lastName,
          },
          updatedAt: transaction.updatedAt,
          type: types.RECEIVED
        }
      )
    );

        const paid = pixPaiyng.map(transaction => ({
          value: transaction.value,
          user: {
            firstName: transaction.receivingUser.firstName,
            lastName: transaction.payingUser.lastName,
          },
          updatedAt: transaction.updatedAt,
          type: types.PAID
        }
      )
    );

    console.log('')
    console.log('Paid')
    console.log(paid)
    console.log('')

    const allTransactions = received.concat(paid);

    console.log('')
    console.log('all Transactions')
    console.log(allTransactions)
    console.log('')

    allTransactions.sort(function (a, b) {
      const dateA: number = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateA < dateB ? 1 : -1;
    });

    console.log('')
    console.log('all Transactions sort')
    console.log(allTransactions)
    console.log('')


    return allTransactions;
  }
}
