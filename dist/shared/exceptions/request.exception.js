"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class InvalidRequestException extends HttpException_1.default {
    constructor() {
        super(400, `Invalid request.`, false);
    }
}
exports.InvalidRequestException = InvalidRequestException;
class AuthenticationTokenMissingException extends HttpException_1.default {
    constructor() {
        super(401, "Authentication token missing", false);
    }
}
exports.AuthenticationTokenMissingException = AuthenticationTokenMissingException;
class InvalidAuthenticationTokenException extends HttpException_1.default {
    constructor() {
        super(401, "Invalid authentication token", false);
    }
}
exports.InvalidAuthenticationTokenException = InvalidAuthenticationTokenException;
class UnauthorizedActionException extends HttpException_1.default {
    constructor() {
        super(403, "Unauthorized action.", false);
    }
}
exports.UnauthorizedActionException = UnauthorizedActionException;
class InternalServerError extends HttpException_1.default {
    constructor() {
        super(500, "Intenal server error.", false);
    }
}
exports.InternalServerError = InternalServerError;
class ForbiddenException extends HttpException_1.default {
    constructor() {
        super(403, "Forbidden.", false);
    }
}
exports.ForbiddenException = ForbiddenException;
class SearchKeywordMissingException extends HttpException_1.default {
    constructor() {
        super(400, `Search keyword is required.`, false);
    }
}
exports.SearchKeywordMissingException = SearchKeywordMissingException;
//# sourceMappingURL=request.exception.js.map