import * as express from "express";

import Controller from "../shared/interfaces/controller.interface";
import validationMiddleware from "../shared/middleware/validation.middleware";
import authMiddleware from "../shared/middleware/auth.middleware";
import deficiencyModel from "./deficiency.model";

import { DeficiencyAlreadyExistException } from "./deficiency.exception";
import { DeficiencyDto } from "./deficiency.dto";

export default class DeficiencyController implements Controller {
  public router = express.Router();
  private deficiency = deficiencyModel;
  private path = "/deficiency";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/save`,
      authMiddleware,
      validationMiddleware(DeficiencyDto),
      this.addDeficiency
    );

    this.router.get(
      `${this.path}/get-all`,
      authMiddleware,
      this.getAllDeficiency
    );
  }

  //save deficiency
  private addDeficiency = async (
    {
      body: {
        deficiency,
        researchCenter
      },
    }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (await this.deficiency.findOne({ deficiency, researchCenter })) {
      next(new DeficiencyAlreadyExistException(deficiency));
    } else {

      const deficiencyData = await this.deficiency.create({ deficiency, researchCenter });

      response.send({
        success: true,
        data: {
          deficiencyData
        }
      });
    }
  };

  //get all deficiency
  private getAllDeficiency = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { researchCenter } = request.query;

    const deficiencyData = await this.deficiency.find({ researchCenter });

    if (deficiencyData && deficiencyData.length > 0) {
      response.status(200).json({
        success: true,
        data: {
          deficiencyData
        }
      });
    } else {
      response.status(200).json({
        success: true,
        data: {
          deficiencyData: []
        }
      });
    }
  }
}
