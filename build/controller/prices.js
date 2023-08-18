"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = void 0;
const helper_1 = require("../@utils/helper");
const prices_1 = __importDefault(require("../model/prices"));
exports.find = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.find().sort({ createdAt: -1 });
    if (!prices)
        return next(new helper_1.appError('cannot find any prices', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
exports.create = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.create({ ...req.body, createdAt: new Date() });
    if (!prices)
        return next(new helper_1.appError('cannot find any prices', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
exports.update = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!prices)
        return next(new helper_1.appError('cannot update prices data', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
exports.remove = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.findByIdAndDelete(req.params.id);
    if (!prices)
        return next(new helper_1.appError('cannot update prices data', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
