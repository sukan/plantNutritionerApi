"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../exceptions/HttpException");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validationMiddleware(type, skipMissingProperties = false) {
    return ({ body }, response, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, body), { skipMissingProperties })
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error) => Object["values"](error.constraints))
                    .join(", ");
                next(new HttpException_1.default(400, message));
            }
            else {
                next();
            }
        })
            .catch(e => e);
    };
}
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map