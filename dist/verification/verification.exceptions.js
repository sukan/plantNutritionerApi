"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../shared/exceptions/HttpException");
class FailToUpdateVerificationException extends HttpException_1.default {
    constructor() {
        super(400, "Failed to update verification request.");
    }
}
exports.FailToUpdateVerificationException = FailToUpdateVerificationException;
class VerificationNotFoundException extends HttpException_1.default {
    constructor(verificationId) {
        super(400, `${verificationId} not found.`);
    }
}
exports.VerificationNotFoundException = VerificationNotFoundException;
class BlockchainTransactionFailedException extends HttpException_1.default {
    constructor() {
        super(400, "Blockchain transaction failed");
    }
}
exports.BlockchainTransactionFailedException = BlockchainTransactionFailedException;
//# sourceMappingURL=verification.exceptions.js.map