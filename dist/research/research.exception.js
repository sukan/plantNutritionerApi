"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../shared/exceptions/HttpException");
class ResearchAlreadyExistException extends HttpException_1.default {
    constructor(researchId) {
        super(400, `${researchId} already exists.`);
    }
}
exports.ResearchAlreadyExistException = ResearchAlreadyExistException;
class ResearchDeficiencyAlreadyExistsException extends HttpException_1.default {
    constructor(deficiency) {
        super(400, `A research for ${deficiency} is already exists`);
    }
}
exports.ResearchDeficiencyAlreadyExistsException = ResearchDeficiencyAlreadyExistsException;
class ResearchCreationFailedException extends HttpException_1.default {
    constructor() {
        super(400, "Failed to create Research.");
    }
}
exports.ResearchCreationFailedException = ResearchCreationFailedException;
class ResearchNotFoundException extends HttpException_1.default {
    constructor() {
        super(400, "Research not found.");
    }
}
exports.ResearchNotFoundException = ResearchNotFoundException;
//# sourceMappingURL=research.exception.js.map