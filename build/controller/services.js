"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = void 0;
const helper_1 = require("../@utils/helper");
const services_1 = __importDefault(require("../model/services"));
exports.find = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const filter = Object.assign({}, ...req.params.filter.split(",").map(el => ({ [el.split("=")[0]]: el.split("=")[1] })));
    let data;
    if (filter) {
        data = await services_1.default.find(filter).sort({ createdAt: -1 });
    }
    else {
        data = await services_1.default.find().sort({ createdAt: -1 });
    }
    if (!data)
        return next(new helper_1.appError('cannot find any services', 401));
    res.status(201).json({
        status: "success",
        data
    });
});
exports.create = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const services = await services_1.default.create({ ...req.body, createdAt: new Date() });
    if (!services)
        return next(new helper_1.appError('cannot update services data', 401));
    res.status(201).json({
        status: "success",
        data: services
    });
});
exports.update = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const services = await services_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!services)
        return next(new helper_1.appError('cannot update services data', 401));
    res.status(201).json({
        status: "success",
        data: services
    });
});
exports.remove = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const services = await services_1.default.findByIdAndDelete(req.params.id);
    if (!services)
        return next(new helper_1.appError('cannot update services data', 401));
    res.status(201).json({
        status: "success",
        data: services
    });
});
