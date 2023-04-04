"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews = void 0;
const helper_1 = require("../@utils/helper");
const reviews_1 = __importDefault(require("../model/reviews"));
exports.reviews = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const reviews = await reviews_1.default.find().sort({ createdAt: -1 });
    if (!reviews)
        return next(new helper_1.appError('cannot find any reviews', 401));
    res.status(201).json({
        status: "success",
        data: reviews
    });
});
