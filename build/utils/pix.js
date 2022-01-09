"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeKey = exports.encodeKey = void 0;
const js_base64_1 = require("js-base64");
const encodeKey = (userID, value, registerID) => {
    const stage1 = (0, js_base64_1.encode)(userID);
    const stage2 = (0, js_base64_1.encode)(value.toString());
    const stage3 = (0, js_base64_1.encode)(registerID);
    return `${stage1}-${stage2}-${stage3}`;
};
exports.encodeKey = encodeKey;
const decodeKey = (key) => {
    const keyDecode = key.split('-');
    const userID = (0, js_base64_1.decode)(keyDecode[0]);
    const value = (0, js_base64_1.decode)(keyDecode[1]);
    const registerID = (0, js_base64_1.decode)(keyDecode[2]);
    return {
        userID,
        value,
        registerID
    };
};
exports.decodeKey = decodeKey;
