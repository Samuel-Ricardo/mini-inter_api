import { Request, Response } from "express";
import UserService from "./user.service";

export default class UserController {

  async singin(req: Request, res: Response) {
    const { email, password } = req.body;

    const userService = new UserService();
    const users = await userService.sigin({ email, password });

    return res.status(200).send(users);
  }
}
