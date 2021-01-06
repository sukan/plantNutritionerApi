"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    gender: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    researchCenter: {
        type: String,
        require: true,
    },
});
userSchema.index({
    username: "text",
});
userSchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });
const userModel = mongoose.model("User", userSchema);
exports.default = userModel;
//# sourceMappingURL=authentication.model.js.map