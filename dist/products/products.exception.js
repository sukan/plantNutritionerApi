"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../shared/exceptions/HttpException");
class ProductAlreadyExistException extends HttpException_1.default {
    constructor(product) {
        super(400, `${product} already exists.`);
    }
}
exports.ProductAlreadyExistException = ProductAlreadyExistException;
class ProductCreationFailedException extends HttpException_1.default {
    constructor() {
        super(400, "Failed to create product.");
    }
}
exports.ProductCreationFailedException = ProductCreationFailedException;
//# sourceMappingURL=products.exception.js.map