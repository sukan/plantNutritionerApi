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
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validation_middleware_1 = require("../shared/middleware/validation.middleware");
const auth_middleware_1 = require("../shared/middleware/auth.middleware");
const authentication_model_1 = require("./authentication.model");
const keys_1 = require("../shared/config/keys");
const authentication_exceptions_1 = require("./authentication.exceptions");
const authentication_dto_1 = require("./authentication.dto");
class AuthenticationController {
    constructor() {
        this.router = express.Router();
        this.user = authentication_model_1.default;
        this.path = "/auth";
        //signIn users
        this.signIn = ({ body: { username, password } }, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findOne({ username }).select({
                password: 1,
                username: 1,
                role: 1,
                gender: 1,
                researchCenter: 1
            });
            if (user) {
                const isPasswordMatching = yield bcrypt.compare(password, user.password);
                if (isPasswordMatching) {
                    const token = this.createToken(user);
                    response.send({
                        success: true,
                        data: {
                            token,
                            gender: user.gender,
                            role: user.role,
                            username,
                            researchCenter: user.researchCenter
                        }
                    });
                }
                else {
                    next(new authentication_exceptions_1.WrongCredentialsException());
                }
            }
            else {
                next(new authentication_exceptions_1.UserNotFoundException());
            }
        });
        //signUp users with different roles
        this.signUp = ({ body: { username, gender, role, password, researchCenter }, }, response, next) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.user.findOne({ username })) {
                next(new authentication_exceptions_1.UserAlreadyExistsException(username));
            }
            else {
                const hashedPassword = yield bcrypt.hash(password, 10);
                const userData = {
                    username,
                    password: hashedPassword,
                    gender,
                    role,
                    researchCenter
                };
                const user = yield this.user.create(userData);
                response.send({
                    success: true,
                    data: {
                        user
                    }
                });
            }
        });
        //get single user details
        this.getUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.user.findOne(request.user).select({
                password: 1,
                username: 1,
                role: 1,
                gender: 1,
                researchCenter: 1
            });
            if (!userData) {
                return response.status(404).json("No User found");
            }
            response.status(200).json({ success: true, data: { username: userData.username, role: userData.role, gender: userData.gender, researchCenter: userData.researchCenter } });
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/login`, validation_middleware_1.default(authentication_dto_1.LogInDto), this.signIn);
        this.router.post(`${this.path}/register`, validation_middleware_1.default(authentication_dto_1.CreateUserDto), this.signUp);
        this.router.get(`${this.path}/userData`, auth_middleware_1.default, this.getUser);
        // this.router.put(`${this.path}/profile`, authMiddleware, this.updateUser);
    }
    // private updateUser = async (
    //   request: express.Request,
    //   response: express.Response,
    //   next: express.NextFunction
    // ) => {
    //   try {
    //     const user = await this.user.findOneAndUpdate(
    //       { _id: request.user._id },
    //       request.body
    //     );
    //     if (user === null) {
    //       return response.status(400).json({
    //         success: false,
    //         data: {
    //           errorCode: 400,
    //           errorMessage: "User could not be found",
    //         },
    //       });
    //     } else {
    //       const updatedUser = {
    //         ...request.body,
    //       };
    //       response.status(200).json({ success: true, data: updatedUser });
    //     }
    //   } catch (error) {
    //     return response.status(500).json({
    //       success: false,
    //       data: {
    //         errorCode: 500,
    //         errorMessage: error,
    //       },
    //     });
    //   }
    // };
    //get token
    createToken({ _id, username }) {
        const expiresIn = 31536000;
        const dataStoredInToken = {
            _id,
            username,
        };
        return {
            expiresIn,
            key: jwt.sign(dataStoredInToken, keys_1.JWT_SECRET, {
                expiresIn,
            }),
        };
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map