"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const pricesSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    subsets: [],
    createdAt: {
        type: Date,
        default: new Date
    },
});
exports.default = (0, mongoose_1.model)('Prices', pricesSchema);
