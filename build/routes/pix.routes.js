"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pix_controller_1 = __importDefault(require("../resources/pix/pix.controller"));
const pixRoutes = (0, express_1.Router)();
const pixController = new pix_controller_1.default();
pixRoutes.post('/request', pixController.request);
pixRoutes.post('/pay/:key', pixController.pay);
pixRoutes.get('/transactions', pixController.transactions);
exports.default = pixRoutes;
