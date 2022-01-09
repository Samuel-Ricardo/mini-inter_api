"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const typeorm_1 = require("typeorm");
const messages_1 = __importStar(require("../../config/messages"));
const pix_1 = require("../../config/pix");
const Pix_1 = require("../../entity/Pix");
const User_1 = require("../../entity/User");
const AppError_1 = __importDefault(require("../../shared/error/AppError"));
const pix_2 = require("../../utils/pix");
class PixService {
    request(value, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pixRepository = (0, typeorm_1.getRepository)(Pix_1.Pix);
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const currentUser = yield userRepository.findOne({ where: { id: user.id } });
            const requestData = {
                requestingUser: currentUser,
                value,
                status: pix_1.status.OPEN
            };
            const register = yield pixRepository.save(requestData);
            const key = (0, pix_2.encodeKey)(user.id || '', value, register.id);
            return key;
        });
    }
    pay(key, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyDecoded = (0, pix_2.decodeKey)(key);
            if (keyDecoded.userID === user.id) {
                throw new AppError_1.default(messages_1.pix_error.RECEIVE_PIX_FROM_SAME_USER, 401);
            }
            const pixRepository = (0, typeorm_1.getRepository)(Pix_1.Pix);
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const requestingUser = yield userRepository.findOne({
                where: { id: keyDecoded.userID }
            });
            const payingUser = yield userRepository.findOne({ where: { id: user.id } });
            if ((payingUser === null || payingUser === void 0 ? void 0 : payingUser.wallet) && payingUser.wallet < Number(keyDecoded.value)) {
                throw new AppError_1.default(messages_1.pix_error.INSUFFICIENT_FUNDS, 401);
            }
            if (!requestingUser || !payingUser) {
                throw new AppError_1.default(messages_1.pix_error.CLIENT_NOT_FOUND, 404);
            }
            payingUser.wallet = Number(payingUser === null || payingUser === void 0 ? void 0 : payingUser.wallet) - Number(keyDecoded.value);
            yield userRepository.save(payingUser);
            requestingUser.wallet = Number(requestingUser === null || requestingUser === void 0 ? void 0 : requestingUser.wallet) + Number(keyDecoded.value);
            yield userRepository.save(requestingUser);
            const pixTransaction = yield pixRepository.findOne({
                where: {
                    id: keyDecoded.registerID,
                    status: pix_1.status.OPEN
                }
            });
            if (!pixTransaction)
                throw new AppError_1.default(messages_1.pix_error.INVALID_KEY, 401);
            pixTransaction.status = pix_1.status.CLOSE;
            pixTransaction.payingUser = payingUser;
            yield pixRepository.save(pixTransaction);
            return { msg: messages_1.default.SUCCESS.PIX.PAYMENT_SUCCESSFULLY };
        });
    }
    transactions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pixRepository = (0, typeorm_1.getRepository)(Pix_1.Pix);
            const pixReceived = yield (yield pixRepository.find({
                where: {
                    receivingUser: user.id,
                    status: pix_1.status.CLOSE
                },
                relations: ['payingUser']
            }));
            const conditions = {
                where: { payingUser: user.id, status: pix_1.status.CLOSE },
                relations: ['receivingUser']
            };
            const pixPaiyng = yield (yield pixRepository.find(conditions));
            const received = pixReceived.map(transaction => ({
                value: transaction.value,
                user: {
                    firstName: transaction.payingUser.firstName,
                    lastName: transaction.payingUser.lastName,
                },
                updatedAt: transaction.updatedAt,
                type: pix_1.types.RECEIVED
            }));
            const paid = pixPaiyng.map(transaction => ({
                value: transaction.value,
                user: {
                    firstName: transaction.receivingUser.firstName,
                    lastName: transaction.payingUser.lastName,
                },
                updatedAt: transaction.updatedAt,
                type: pix_1.types.PAID
            }));
            const allTransactions = received.concat(paid);
            allTransactions.sort(function (a, b) {
                const dateA = new Date(a.updatedAt).getTime();
                const dateB = new Date(b.updatedAt).getTime();
                return dateA < dateB ? 1 : -1;
            });
            return allTransactions;
        });
    }
}
exports.default = PixService;
