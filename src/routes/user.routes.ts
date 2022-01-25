import { Router } from "express";
import UserController from "../resources/user/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/signin', userController.singin);
userRouter.post('/singnup', userController.singnup);
userRouter.get('/me', userController.me);

export default userRouter;
