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
const verification_exceptions_1 = require("./verification.exceptions");
const axios_1 = require("axios");
function VerificationRequestTransaction(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { verificationId, deficiency, stage, researchCenter, username, checked, } = request.body;
        axios_1.default
            .post("http://157.245.104.157:8000/api/addVerificationRequest", {
            verificationRequestID: verificationId,
            disorderType: deficiency,
            disorder_degree: stage,
            research_institute: researchCenter,
            farmer_ID: username,
            status: checked ? "Approved" : "pending",
        })
            .then((response) => {
            console.log(response);
            next();
        })
            .catch(() => next(new verification_exceptions_1.BlockchainTransactionFailedException()));
    });
}
exports.VerificationRequestTransaction = VerificationRequestTransaction;
function VerificationResponseTransaction(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { verificationId, researchCenter, username, verificationNote, stage, } = request.body;
        axios_1.default
            .post("http://157.245.104.157:8001/api/addExpertResponse", {
            responseID: verificationId,
            expert_ID: researchCenter,
            farmer_ID: username,
            response: verificationNote,
            products: stage,
        })
            .then((response) => {
            console.log(response);
            next();
        })
            .catch(() => next(new verification_exceptions_1.BlockchainTransactionFailedException()));
    });
}
exports.VerificationResponseTransaction = VerificationResponseTransaction;
//# sourceMappingURL=verification.middleware.js.map