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
const research_model_1 = require("./research.model");
const research_dto_1 = require("./research.dto");
const research_exception_1 = require("./research.exception");
class ResearchController {
    constructor() {
        this.router = express.Router();
        this.research = research_model_1.default;
        this.path = "/research";
        //save research
        this.addResearch = ({ body: { researchId, deficiency, findings, products, researchCenter }, }, response, next) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.research.findOne({ researchId })) {
                next(new research_exception_1.ResearchAlreadyExistException(researchId));
            }
            else if (yield this.research.findOne({ deficiency, researchCenter })) {
                next(new research_exception_1.ResearchDeficiencyAlreadyExistsException(deficiency));
            }
            else {
                let newResearch = {
                    researchId,
                    deficiency,
                    findings,
                    products,
                    researchCenter
                };
                const research = yield this.research.create(newResearch);
                if (!research) {
                    next(new research_exception_1.ResearchCreationFailedException());
                }
                response.status(201).json({
                    success: true,
                    data: {
                        research
                    }
                });
            }
        });
        //get all researches for a research center
        this.getAllResearches = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter } = request.query;
            const researches = yield this.research.find({ researchCenter });
            if (researches && researches.length > 0) {
                response.status(200).json({
                    success: true,
                    data: {
                        researches
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
        //get single research by research center and deficiency
        this.getSingleResearch = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter, deficiency } = request.query;
            const researches = yield this.research.findOne({ researchCenter, deficiency });
            if (researches) {
                response.status(200).json({
                    success: true,
                    data: {
                        researches
                    }
                });
            }
            else {
                next(new research_exception_1.ResearchNotFoundException());
            }
        });
        //get new research Id
        this.getNewResearchId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const researches = yield this.research.countDocuments();
            let newId = `RH000${researches + 1}`;
            response.status(200).json({
                success: true,
                data: newId
            });
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/save`, auth_middleware_1.default, validation_middleware_1.default(research_dto_1.ResearchDto), this.addResearch);
        this.router.get(`${this.path}/get-all`, auth_middleware_1.default, this.getAllResearches);
        this.router.get(`${this.path}/get-research`, auth_middleware_1.default, this.getSingleResearch);
        this.router.get(`${this.path}/get-id`, auth_middleware_1.default, this.getNewResearchId);
    }
}
exports.default = ResearchController;
//# sourceMappingURL=research.controller.js.map