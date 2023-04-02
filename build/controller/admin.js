"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_prices = exports.update_prices = exports.create_prices = exports.get_prices = exports.update_users = exports.get_users = void 0;
const helper_1 = require("../@utils/helper");
const users_1 = __importDefault(require("../model/users"));
const prices_1 = __importDefault(require("../model/prices"));
exports.get_users = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const data = await users_1.default.find();
    if (!data)
        return next(new helper_1.appError('cannot find any users', 401));
    res.status(201).json({
        status: "success",
        data
    });
});
exports.update_users = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const user = await users_1.default.findByIdAndUpdate(req.body._id, { ...req.body }, { new: true });
    if (!user)
        return next(new helper_1.appError('cannot update user data', 401));
    res.status(201).json({
        status: "success",
        data: user
    });
});
exports.get_prices = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.find().sort({ createdAt: -1 });
    if (!prices)
        return next(new helper_1.appError('cannot find any prices', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
exports.create_prices = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.create({ ...req.body, createdAt: new Date() });
    if (!prices)
        return next(new helper_1.appError('cannot find any prices', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
exports.update_prices = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!prices)
        return next(new helper_1.appError('cannot update prices data', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
exports.delete_prices = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const prices = await prices_1.default.findByIdAndDelete(req.params.id);
    if (!prices)
        return next(new helper_1.appError('cannot update prices data', 401));
    res.status(201).json({
        status: "success",
        data: prices
    });
});
