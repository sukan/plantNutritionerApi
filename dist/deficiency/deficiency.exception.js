"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../shared/exceptions/HttpException");
class DeficiencyAlreadyExistException extends HttpException_1.default {
    constructor(deficiency) {
        super(400, `${deficiency} already exists as a deficiency.`);
    }
}
exports.DeficiencyAlreadyExistException = DeficiencyAlreadyExistException;
//# sourceMappingURL=deficiency.exception.js.map