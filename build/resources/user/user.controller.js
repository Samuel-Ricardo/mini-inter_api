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
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    singin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userService = new user_service_1.default();
            const users = yield userService.sigin({ email, password });
            return res.status(200).send(users);
        });
    }
    singnup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new user_service_1.default();
            const users = yield userService.signup(req.body);
            return res.status(201).send(users);
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new user_service_1.default();
            const user = yield userService.me(req.user);
            return res.status(201).send(user);
        });
    }
}
exports.default = UserController;
