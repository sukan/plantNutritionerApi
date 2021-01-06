import * as express from "express";

import Controller from "../shared/interfaces/controller.interface";
import validationMiddleware from "../shared/middleware/validation.middleware";
import authMiddleware from "../shared/middleware/auth.middleware";
import researchModel from "./research.model";

import { ResearchDto } from "./research.dto";
import { ResearchAlreadyExistException, ResearchNotFoundException, ResearchDeficiencyAlreadyExistsException, ResearchCreationFailedException } from './research.exception'
import { nextTick } from "process";

export default class ResearchController implements Controller {
  public router = express.Router();
  private research = researchModel;
  private path = "/research";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/save`,
      authMiddleware,
      validationMiddleware(ResearchDto),
      this.addResearch
    );

    this.router.get(
      `${this.path}/get-all`,
      authMiddleware,
      this.getAllResearches
    );

    this.router.get(
      `${this.path}/get-research`,
      authMiddleware,
      this.getSingleResearch
    );

    this.router.get(
      `${this.path}/get-id`,
      authMiddleware,
      this.getNewResearchId
    );
  }

  //save research
  private addResearch = async (
    {
      body: {
        researchId,
        deficiency,
        findings,
        products,
        researchCenter
      },
    }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (await this.research.findOne({ researchId })) {
      next(new ResearchAlreadyExistException(researchId));
    } else if (await this.research.findOne({ deficiency, researchCenter })) {
      next(new ResearchDeficiencyAlreadyExistsException(deficiency))
    }
    else {

      let newResearch = {
        researchId,
        deficiency,
        findings,
        products,
        researchCenter
      }

      const research = await this.research.create(newResearch);

      if (!research) {
        next(new ResearchCreationFailedException())
      }

      response.status(201).json({
        success: true,
        data: {
          research
        }
      });
    }
  };

  //get all researches for a research center
  private getAllResearches = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { researchCenter } = request.query;

    const researches = await this.research.find({ researchCenter });

    if (researches && researches.length > 0) {
      response.status(200).json({
        success: true,
        data: {
          researches
        }
      });
    } else {
      response.status(200).json({
        success: true,
        data: {
          researches: []
        }
      });
    }
  }

  //get single research by research center and deficiency
  private getSingleResearch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { researchCenter, deficiency } = request.query;

    const researches = await this.research.findOne({ researchCenter, deficiency });

    if (researches) {
      response.status(200).json({
        success: true,
        data: {
          researches
        }
      });
    } else {
      next(new ResearchNotFoundException())
    }
  }

  //get new research Id
  private getNewResearchId = async (
    request: express.Request,
    response: express.Response
  ) => {
    const researches = await this.research.countDocuments();

    let newId = `RH000${researches + 1}`

    response.status(200).json({
      success: true,
      data: newId
    });
  }
}
