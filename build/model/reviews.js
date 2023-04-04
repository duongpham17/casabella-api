"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const reviewsSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    review: {
        type: String,
    },
    stars: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});
exports.default = (0, mongoose_1.model)('Reviews', reviewsSchema);
