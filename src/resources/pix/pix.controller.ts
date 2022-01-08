import { NextFunction, Request, Response } from "express";
import PixService from "./pix.service";

export default class PixController {

  async request(req: Request, res: Response, next: NextFunction) {

    const pixService = new PixService();

    const { value } = req.body;
    const user = req.user;

    const requestKey = await pixService.request(value, user);
    return res.status(200).send({ copyPasteKey: requestKey });
  }

  async pay(req: Request, res: Response) {

    const pixService = new PixService();

    const { key } = req.params;
    const payment = await pixService.pay(key, req.user);

    return res.status(201).send(payment);
  }
}
