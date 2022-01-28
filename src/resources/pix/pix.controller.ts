import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import PixService from "./pix.service";

export default class PixController {

  async request(req: Request, res: Response, next: NextFunction) {

    const pixService = new PixService();

    const { value } = req.body;
    const user = req.user;

    const requestKey = await pixService.request(value, user);
    return res.status(200).send({ copyPasteKey: requestKey });
  }

  async pay(req: Request, res: Response, next:NextFunction) {

    try {
      const pixService = new PixService();

      console.log(req.user)

      const { key } = req.params;
      const payment = await pixService.pay(key, req.user);

      return res.status(201).send(payment);

    } catch (error) { next(error) }
  }

  async transactions(req:Request, res:Response) {
    const pixService = new PixService();
    const transactions = await pixService.transactions(req.user);
    return res.status(201).send({transactions});
  }
}
