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
const deficiency_model_1 = require("./deficiency.model");
const deficiency_exception_1 = require("./deficiency.exception");
const deficiency_dto_1 = require("./deficiency.dto");
class DeficiencyController {
    constructor() {
        this.router = express.Router();
        this.deficiency = deficiency_model_1.default;
        this.path = "/deficiency";
        //save deficiency
        this.addDeficiency = ({ body: { deficiency, researchCenter }, }, response, next) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.deficiency.findOne({ deficiency, researchCenter })) {
                next(new deficiency_exception_1.DeficiencyAlreadyExistException(deficiency));
            }
            else {
                const deficiencyData = yield this.deficiency.create({ deficiency, researchCenter });
                response.send({
                    success: true,
                    data: {
                        deficiencyData
                    }
                });
            }
        });
        //get all deficiency
        this.getAllDeficiency = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter } = request.query;
            const deficiencyData = yield this.deficiency.find({ researchCenter });
            if (deficiencyData && deficiencyData.length > 0) {
                response.status(200).json({
                    success: true,
                    data: {
                        deficiencyData
                    }
                });
            }
            else {
                response.status(200).json({
                    success: true,
                    data: {
                        deficiencyData: []
                    }
                });
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/save`, auth_middleware_1.default, validation_middleware_1.default(deficiency_dto_1.DeficiencyDto), this.addDeficiency);
        this.router.get(`${this.path}/get-all`, auth_middleware_1.default, this.getAllDeficiency);
    }
}
exports.default = DeficiencyController;
//# sourceMappingURL=deficiency.controller.js.map