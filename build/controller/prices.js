"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prices = void 0;
const helper_1 = require("../@utils/helper");
const prices_1 = __importDefault(require("../model/prices"));
exports.prices = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.find().sort({ createdAt: -1 });
    if (!prices)
        return next(new helper_1.appError('cannot find any prices', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
