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
const products_model_1 = require("./products.model");
const products_dto_1 = require("./products.dto");
const products_exception_1 = require("./products.exception");
class ProductController {
    constructor() {
        this.router = express.Router();
        this.product = products_model_1.default;
        this.path = "/product";
        //save product
        this.addProduct = ({ body: { productCode, productName, vendor, unitPrice, applicationMethod, deficiency, researchCenter }, }, response, next) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.product.findOne({ productCode, researchCenter })) {
                next(new products_exception_1.ProductAlreadyExistException(productCode));
            }
            else {
                let newProduct = {
                    productCode,
                    productName,
                    vendor,
                    unitPrice,
                    applicationMethod,
                    deficiency,
                    researchCenter
                };
                const product = yield this.product.create(newProduct);
                if (!product) {
                    next(new products_exception_1.ProductCreationFailedException());
                }
                response.status(201).json({
                    success: true,
                    data: {
                        product
                    }
                });
            }
        });
        //get all products
        this.getAllProducts = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter } = request.query;
            const products = yield this.product.find({ researchCenter });
            if (products && products.length > 0) {
                response.status(200).json({
                    success: true,
                    data: {
                        products
                    }
                });
            }
            else {
                response.status(200).json({
                    success: true,
                    data: {
                        products: []
                    }
                });
            }
        });
        //get all products by deficiency
        this.getAllProductsByDeficiency = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { researchCenter, deficiency } = request.query;
            const products = yield this.product.find({ researchCenter, deficiency });
            if (products && products.length > 0) {
                response.status(200).json({
                    success: true,
                    data: {
                        products
                    }
                });
            }
            else {
                response.status(200).json({
                    success: true,
                    data: {
                        products: []
                    }
                });
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/save`, auth_middleware_1.default, validation_middleware_1.default(products_dto_1.ProductDto), this.addProduct);
        this.router.get(`${this.path}/get-all`, auth_middleware_1.default, this.getAllProducts);
        this.router.get(`${this.path}/get-by-deficiency`, auth_middleware_1.default, this.getAllProductsByDeficiency);
    }
}
exports.default = ProductController;
//# sourceMappingURL=products.controller.js.map