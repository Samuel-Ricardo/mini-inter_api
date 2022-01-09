"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.status = void 0;
exports.status = {
    OPEN: 'open',
    CLOSE: 'close'
};
exports.types = {
    RECEIVED: 'received',
    PAID: 'paid'
};
const pix = {
    STATUS: Object.assign({}, exports.status),
    TYPES: Object.assign({}, exports.types)
};
exports.default = pix;
