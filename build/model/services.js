"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const servicesSchema = new mongoose_1.Schema({
    type: {
        type: String,
    },
    text_1: {
        type: String,
    },
    text_2: {
        type: String,
    },
    text_3: {
        type: String,
    },
    text_4: {
        type: String,
    },
    text_5: {
        type: String,
    },
    image: {
        type: String
    },
    more: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});
exports.default = (0, mongoose_1.model)('Services', servicesSchema);
