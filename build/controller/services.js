"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const helper_1 = require("../@utils/helper");
const services_1 = __importDefault(require("../model/services"));
exports.services = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const services = await services_1.default.find().sort({ createdAt: -1 });
    if (!services)
        return next(new helper_1.appError('cannot find any services', 401));
    res.status(201).json({
        status: "success",
        data: services
    });
});
