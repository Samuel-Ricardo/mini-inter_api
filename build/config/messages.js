"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.error = exports.user_messages = exports.user_success = exports.user_error = exports.pix_messages = exports.pix_success = exports.pix_error = void 0;
exports.pix_error = {
    RECEIVE_PIX_FROM_SAME_USER: 'It is not possible to receive the PIX from the same user',
    INSUFFICIENT_FUNDS: 'There is not enough balance to make the payment',
    CLIENT_NOT_FOUND: "We didn't find the transaction's customers, generate a new key",
    INVALID_KEY: "Invalid key, please generate a new key"
};
exports.pix_success = {
    PAYMENT_SUCCESSFULLY: "Payment made successfully",
};
exports.pix_messages = {
    ERROR: Object.assign({}, exports.pix_error),
    SUCCESS: Object.assign({}, exports.pix_success)
};
exports.user_error = {
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: "There is already a registered user with this email",
};
exports.user_success = {};
exports.user_messages = {
    ERROR: Object.assign({}, exports.user_error),
    SUCCESS: Object.assign({}, exports.user_success)
};
exports.error = {
    USER: Object.assign({}, exports.user_messages.ERROR),
    PIX: Object.assign({}, exports.pix_messages.ERROR)
};
exports.success = {
    PIX: Object.assign({}, exports.pix_messages.SUCCESS)
};
const messages = {
    ERROR: Object.assign({}, exports.error),
    SUCCESS: Object.assign({}, exports.success)
};
exports.default = messages;
