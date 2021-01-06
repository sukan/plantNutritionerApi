"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const researchSchema = new mongoose.Schema({
    researchId: {
        type: String,
        index: true,
        unique: true,
    },
    deficiency: {
        type: String,
        require: true,
    },
    findings: {
        type: String,
    },
    products: {
        type: Array,
    },
    researchCenter: {
        type: String
    }
});
researchSchema.index({
    researchId: "text",
});
researchSchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });
const researchModel = mongoose.model("Research", researchSchema);
exports.default = researchModel;
//# sourceMappingURL=research.model.js.map