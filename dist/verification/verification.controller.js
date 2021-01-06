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
const validation_middleware_1 = require("../shared/middleware/validation.middleware");
const auth_middleware_1 = require("../shared/middleware/auth.middleware");
const verification_model_1 = require("./verification.model");
const verification_exceptions_1 = require("./verification.exceptions");
const verification_middleware_1 = require("./verification.middleware");
const verification_dto_1 = require("./verification.dto");
class VerificationController {
    constructor() {
        this.router = express.Router();
        this.verification = verification_model_1.default;
        this.path = "/verification";
        //save verification
        this.saveOrUpdateVerification = ({ body: { verificationId, username, deficiency, findings, products, researchCenter, image, stage, nValue, pValue, kValue, checked }, }, response, next) => __awaiter(this, void 0, void 0, function* () {
            let newVerification = {
                verificationId,
                username,
                deficiency,
                findings,
                products,
                researchCenter,
                image,
                stage,
                nValue,
                pValue,
                kValue,
                checked
            };
            if (yield this.verification.findOne({ verificationId })) {
                const verification = yield this.verification.findOneAndUpdate({ verificationId }, newVerification);
                if (!verification) {
                    next(new verification_exceptions_1.FailToUpdateVerificationException());
                }
                response.status(200).json({
                    success: true,
                    data: {
                        verification
                    }
                });
            }
            else {
                const verification = yield this.verification.create(newVerification);
                if (!verification) {
                    next(new verification_exceptions_1.FailToUpdateVerificationException());
                }
                response.status(201).json({
                    success: true,
                    data: {
                        verification
                    }
                });
            }
        });
        //get all verification requests for a research center
        this.getAllVerifications = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter } = request.query;
            const verifications = yield this.verification.find({ researchCenter });
            if (verifications && verifications.length > 0) {
                response.status(200).json({
                    success: true,
                    data: {
                        verifications
                    }
                });
            }
            else {
                response.status(200).json({
                    success: true,
                    data: {
                        verifications: []
                    }
                });
            }
        });
        //get all verification requests for a farmer
        this.getAllVerificationsForFarmer = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter, username } = request.query;
            const verifications = yield this.verification.find({ researchCenter, username });
            if (verifications && verifications.length > 0) {
                response.status(200).json({
                    success: true,
                    data: {
                        verifications
                    }
                });
            }
            else {
                response.status(200).json({
                    success: true,
                    data: {
                        researches: []
                    }
                });
            }
        });
        //get single verification request by research center and username
        this.getSingleVerification = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter, verificationId } = request.query;
            const verification = yield this.verification.findOne({ researchCenter, verificationId });
            if (verification) {
                response.status(200).json({
                    success: true,
                    data: {
                        verification
                    }
                });
            }
            else {
                next(new verification_exceptions_1.VerificationNotFoundException(verificationId));
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        // farmer request verification
        this.router.post(`${this.path}/save`, auth_middleware_1.default, validation_middleware_1.default(verification_dto_1.VerificationDto), verification_middleware_1.VerificationRequestTransaction, this.saveOrUpdateVerification);
        // researcher confirm verification
        this.router.put(`${this.path}/update`, auth_middleware_1.default, validation_middleware_1.default(verification_dto_1.VerificationDto), verification_middleware_1.VerificationResponseTransaction, this.saveOrUpdateVerification);
        this.router.get(`${this.path}/get-all`, auth_middleware_1.default, this.getAllVerifications);
        this.router.get(`${this.path}/get-all-farmer`, auth_middleware_1.default, this.getAllVerificationsForFarmer);
        this.router.get(`${this.path}/get-single`, auth_middleware_1.default, this.getSingleVerification);
    }
}
exports.default = VerificationController;
//# sourceMappingURL=verification.controller.js.map