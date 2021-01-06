"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, success = true) {
        super(message);
        this.status = status;
        this.success = success;
        this.message = message;
    }
}
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map