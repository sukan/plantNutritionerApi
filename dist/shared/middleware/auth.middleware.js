"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authentication_model_1 = require("../../authentication/authentication.model");
const request_exception_1 = require("../exceptions/request.exception");
const keys_1 = require("../config/keys");
function authMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const header = request.headers;
        if (header && header.authorization) {
            try {
                const { _id } = jwt.verify(header.authorization, keys_1.JWT_SECRET);
                const user = yield authentication_model_1.default.findOne({ _id });
                if (user) {
                    request.user = user;
                    next();
                }
                else {
                    next(new request_exception_1.InvalidAuthenticationTokenException());
                }
            }
            catch (error) {
                next(new request_exception_1.InvalidAuthenticationTokenException());
            }
        }
        else {
            next(new request_exception_1.AuthenticationTokenMissingException());
        }
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map