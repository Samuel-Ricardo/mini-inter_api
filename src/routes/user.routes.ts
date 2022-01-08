import { Router } from "express";
import UserController from "../resources/user/user.controller";

const userRouter = Router();
const userController = new UserController();



export default userRouter;
