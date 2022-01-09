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
const pix_service_1 = __importDefault(require("./pix.service"));
class PixController {
    request(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const pixService = new pix_service_1.default();
            const { value } = req.body;
            const user = req.user;
            const requestKey = yield pixService.request(value, user);
            return res.status(200).send({ copyPasteKey: requestKey });
        });
    }
    pay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pixService = new pix_service_1.default();
            const { key } = req.params;
            const payment = yield pixService.pay(key, req.user);
            return res.status(201).send(payment);
        });
    }
    transactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pixService = new pix_service_1.default();
            const transactions = yield pixService.transactions(req.user);
            return res.status(201).send({ transactions });
        });
    }
}
exports.default = PixController;
