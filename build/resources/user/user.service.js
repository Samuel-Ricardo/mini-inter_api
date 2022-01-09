"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
//import {MD5} from "crypto-js";
const md5_1 = __importDefault(require("crypto-js/md5"));
const auth_1 = __importDefault(require("../../config/auth"));
const AppError_1 = __importDefault(require("../../shared/error/AppError"));
const messages_1 = require("../../config/messages");
const User_1 = require("../../entity/User");
const typeorm_1 = require("typeorm");
class UserService {
    sigin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email, password } = user;
            const passwordHash = (0, md5_1.default)(password).toString();
            const existUser = yield userRepository.findOne({ where: { email, password: passwordHash } });
            if (!existUser) {
                throw new AppError_1.default(messages_1.error.USER.USER_NOT_FOUND, 401);
            }
            const { secret, expiresIn } = auth_1.default.jwt;
            const token = (0, jsonwebtoken_1.sign)({
                first_name: existUser.firstName,
                last_name: existUser.lastName,
                account_number: existUser.accountNumber,
                account_digit: existUser.accountDigits,
                wallet: existUser.wallet
            }, secret, {
                subject: existUser.id,
                expiresIn
            });
            //@ts-expect-error ignora
            delete existUser.password;
            return { access_token: token };
        });
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const existUser = yield userRepository.findOne({ where: { email: user.email } });
            if (!existUser) {
                throw new AppError_1.default(messages_1.error.USER.USER_ALREADY_EXISTS, 401);
            }
            const userData = Object.assign(Object.assign({}, user), { password: (0, md5_1.default)(user.password).toString(), wallet: 0, accountNumber: Math.floor(Math.random() * 999999), accountDigits: Math.floor(Math.random() * 99) });
            const userCreate = yield userRepository.save(userData);
            const { secret, expiresIn } = auth_1.default.jwt;
            const token = (0, jsonwebtoken_1.sign)({
                first_name: user.first_name,
                last_name: user.last_name,
                account_number: userData.accountNumber,
                account_digit: userData.accountDigits,
                wallet: userData.wallet
            }, secret, {
                subject: userCreate.id,
                expiresIn
            });
            return { accessToken: token };
        });
    }
    me(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const currentUser = yield userRepository.findOne({ where: { id: user.id } });
            if (!currentUser) {
                throw new AppError_1.default(messages_1.error.USER.USER_NOT_FOUND, 401);
            }
            // @ts-expect-error ignora
            delete currentUser.password;
            return currentUser;
        });
    }
}
exports.default = UserService;
