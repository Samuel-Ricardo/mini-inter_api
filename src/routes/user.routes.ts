import { Router } from "express";
import UserController from "../resources/user/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/singin', userController.singin);
userRouter.post('/singnup', userController.singnup);


export default userRouter;
