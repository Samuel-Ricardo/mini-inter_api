import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";

export default class UserController {

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userService = new UserService();
      const user = await userService.sigin({ email, password });

      console.log("")
      console.log("tOKEN: "+user)
      console.log("")


      return res.status(200).send(user);
    } catch (error) {
      next(error)
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {

      const userService = new UserService();
      const users = await userService.signup(req.body);
      return res.status(201).send(users);

    }catch(error) { next(error) }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try{
      const userService = new UserService();
      const user = await userService.me(req.user);

      return res.status(201).send(user);
    }catch(error){ next(error) }
  }
}
