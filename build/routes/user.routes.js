"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../resources/user/user.controller"));
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.default();
userRouter.post('/singin', userController.singin);
userRouter.post('/singnup', userController.singnup);
userRouter.get('/me', userController.me);
exports.default = userRouter;
