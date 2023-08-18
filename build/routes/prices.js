"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controller/authentication");
const prices_1 = require("../controller/prices");
const router = express_1.default.Router();
router.get('/', prices_1.find);
router.use(authentication_1.protect, (0, authentication_1.restrictTo)("admin"));
router.post('/', prices_1.create);
router.patch('/', prices_1.update);
router.delete('/:id', prices_1.remove);
exports.default = router;
