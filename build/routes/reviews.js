"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controller/authentication");
const reviews_1 = require("../controller/reviews");
const router = express_1.default.Router();
router.get('/', reviews_1.find);
router.use(authentication_1.protect, (0, authentication_1.restrictTo)("admin"));
router.post('/', reviews_1.create);
router.patch('/', reviews_1.update);
router.delete('/:id', reviews_1.remove);
exports.default = router;
