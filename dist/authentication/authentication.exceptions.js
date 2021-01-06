"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../shared/exceptions/HttpException");
class UserNotFoundException extends HttpException_1.default {
    constructor() {
        super(404, `User not found`);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class WrongCredentialsException extends HttpException_1.default {
    constructor() {
        super(400, `Your username or password is incorrect.`);
    }
}
exports.WrongCredentialsException = WrongCredentialsException;
class UserAlreadyExistsException extends HttpException_1.default {
    constructor(username) {
        super(400, `User with username ${username} already exists.`);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
//# sourceMappingURL=authentication.exceptions.js.map