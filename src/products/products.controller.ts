import * as express from "express";

import Controller from "../shared/interfaces/controller.interface";
import validationMiddleware from "../shared/middleware/validation.middleware";
import authMiddleware from "../shared/middleware/auth.middleware";
import productModel from "./products.model";

import { ProductDto } from "./products.dto";
import { ProductAlreadyExistException, ProductCreationFailedException } from "./products.exception";

export default class ProductController implements Controller {
  public router = express.Router();
  private product = productModel;
  private path = "/product";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/save`,
      authMiddleware,
      validationMiddleware(ProductDto),
      this.addProduct
    );

    this.router.get(
      `${this.path}/get-all`,
      authMiddleware,
      this.getAllProducts
    );

    this.router.get(
      `${this.path}/get-by-deficiency`,
      authMiddleware,
      this.getAllProductsByDeficiency
    );
  }

  //save product
  private addProduct = async (
    {
      body: {
        productCode,
        productName,
        vendor,
        unitPrice,
        applicationMethod,
        deficiency,
        researchCenter
      },
    }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (await this.product.findOne({ productCode, researchCenter })) {
      next(new ProductAlreadyExistException(productCode));
    } else {

      let newProduct = {
        productCode,
        productName,
        vendor,
        unitPrice,
        applicationMethod,
        deficiency,
        researchCenter
      }

      const product = await this.product.create(newProduct);

      if (!product) {
        next(new ProductCreationFailedException())
      }

      response.status(201).json({
        success: true,
        data: {
          product
        }
      });
    }
  };

  //get all products
  private getAllProducts = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { researchCenter } = request.query;

    const products = await this.product.find({ researchCenter });

    if (products && products.length > 0) {
      response.status(200).json({
        success: true,
        data: {
          products
        }
      });
    } else {
      response.status(200).json({
        success: true,
        data: {
          products: []
        }
      });
    }
  }

  //get all products by deficiency
  private getAllProductsByDeficiency = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { researchCenter, deficiency } = request.query;

    const products = await this.product.find({ researchCenter, deficiency });

    if (products && products.length > 0) {
      response.status(200).json({
        success: true,
        data: {
          products
        }
      });
    } else {
      response.status(200).json({
        success: true,
        data: {
          products: []
        }
      });
    }
  }
}
