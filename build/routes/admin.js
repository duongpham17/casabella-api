"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controller/authentication");
const admin_1 = require("../controller/admin");
const router = express_1.default.Router();
router.use(authentication_1.protect, (0, authentication_1.restrictTo)("admin"));
router.get('/users', admin_1.get_users);
router.post('/users', admin_1.update_users);
router.get('/prices', admin_1.get_prices);
router.post('/prices', admin_1.create_prices);
router.patch('/prices', admin_1.update_prices);
router.delete('/prices/:id', admin_1.delete_prices);
exports.default = router;
