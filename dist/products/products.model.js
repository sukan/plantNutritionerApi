"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
        index: true,
        unique: true,
    },
    productName: {
        type: String,
        require: true,
    },
    vendor: {
        type: String,
    },
    unitPrice: {
        type: Number
    },
    applicationMethod: {
        type: String
    },
    deficiency: {
        type: String
    },
    researchCenter: {
        type: String
    }
});
productSchema.index({
    productCode: "text",
});
productSchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });
const productModel = mongoose.model("Product", productSchema);
exports.default = productModel;
//# sourceMappingURL=products.model.js.map