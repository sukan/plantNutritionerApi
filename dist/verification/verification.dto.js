"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class VerificationDto {
}
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "verificationId", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "deficiency", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "findings", void 0);
__decorate([
    class_validator_1.IsArray()
], VerificationDto.prototype, "products", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "researchCenter", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "image", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "stage", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "nValue", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "pValue", void 0);
__decorate([
    class_validator_1.IsString()
], VerificationDto.prototype, "kValue", void 0);
__decorate([
    class_validator_1.IsBoolean()
], VerificationDto.prototype, "checked", void 0);
exports.VerificationDto = VerificationDto;
//# sourceMappingURL=verification.dto.js.map