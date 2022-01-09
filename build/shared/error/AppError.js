"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    constructor(message, statusCode = 400, data) {
        this.message = message,
            this.statusCode = statusCode,
            this.data = data;
    }
}
exports.default = AppError;
