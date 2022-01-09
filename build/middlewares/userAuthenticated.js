"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const AppError_1 = __importDefault(require("../shared/error/AppError"));
function userAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw new AppError_1.default('JWT Não enviado', 401);
    const [, token] = authHeader.split('');
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        const { sub, first_name, last_name } = decoded;
        req.user = {
            id: sub,
            first_name,
            last_name
        };
        return next();
    }
    catch (_a) {
        throw new AppError_1.default('Token JWT Inválido', 401);
    }
}
exports.default = userAuthenticated;
