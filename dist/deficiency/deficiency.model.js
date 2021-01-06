"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const deficiencySchema = new mongoose.Schema({
    deficiency: {
        type: String,
        index: true,
        unique: true,
    },
    researchCenter: {
        type: String,
        require: true,
    },
});
deficiencySchema.index({
    deficiency: "text",
});
deficiencySchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });
const deficiencyModel = mongoose.model("Deficiency", deficiencySchema);
exports.default = deficiencyModel;
//# sourceMappingURL=deficiency.model.js.map