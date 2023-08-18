"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controller/authentication");
const users_1 = require("../controller/users");
const router = express_1.default.Router();
router.get('/', users_1.find);
router.use(authentication_1.protect, (0, authentication_1.restrictTo)("admin"));
router.patch('/', users_1.update);
exports.default = router;
