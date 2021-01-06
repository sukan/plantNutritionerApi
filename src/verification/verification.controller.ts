import * as express from "express";

import Controller from "../shared/interfaces/controller.interface";
import validationMiddleware from "../shared/middleware/validation.middleware";
import authMiddleware from "../shared/middleware/auth.middleware";
import verificationModel from "./verification.model";
import { FailToUpdateVerificationException, VerificationNotFoundException } from "./verification.exceptions";
import { VerificationRequestTransaction, VerificationResponseTransaction } from "./verification.middleware";

import { VerificationDto } from "./verification.dto";

export default class VerificationController implements Controller {
  public router = express.Router();
  private verification = verificationModel;
  private path = "/verification";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // farmer request verification
    this.router.post(
      `${this.path}/save`,
      authMiddleware,
      validationMiddleware(VerificationDto),
      VerificationRequestTransaction,
      this.saveOrUpdateVerification
    );

    // researcher confirm verification
    this.router.put(
      `${this.path}/update`,
      authMiddleware,
      validationMiddleware(VerificationDto),
      VerificationResponseTransaction,
      this.saveOrUpdateVerification
    );

    this.router.get(
      `${this.path}/get-all`,
      authMiddleware,
      this.getAllVerifications
    );

    this.router.get(
      `${this.path}/get-all-farmer`,
      authMiddleware,
      this.getAllVerificationsForFarmer
    );

    this.router.get(
      `${this.path}/get-single`,
      authMiddleware,
      this.getSingleVerification
    );
  }

  //save verification
  private saveOrUpdateVerification = async (
    {
      body: {
        verificationId,
        username,
        deficiency,
        findings,
        products,
        researchCenter,
        image,
        stage,
        nValue,
        pValue,
        kValue,
        checked
      },
    }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    let newVerification = {
      verificationId,
      username,
      deficiency,
      findings,
      products,
      researchCenter,
      image,
      stage,
      nValue,
      pValue,
      kValue,
      checked
    }

    if (await this.verification.findOne({ verificationId })) {
      const verification = await this.verification.findOneAndUpdate({ verificationId }, newVerification);

      if (!verification) {
        next(new FailToUpdateVerificationException())
      }
      response.status(200).json({
        success: true,
        data: {
          verification
        }
      });
    } else {
      const verification = await this.verification.create(newVerification);

      if (!verification) {
        next(new FailToUpdateVerificationException())
      }
      response.status(201).json({
        success: true,
        data: {
          verification
        }
      });
    }
  };

  //get all verification requests for a research center
  private getAllVerifications = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { researchCenter } = request.query;

    const verifications = await this.verification.find({ researchCenter });

    if (verifications && verifications.length > 0) {
      response.status(200).json({
        success: true,
        data: {
          verifications
        }
      });
    } else {
      response.status(200).json({
        success: true,
        data: {
          verifications: []
        }
      });
    }
  }

  //get all verification requests for a farmer
  private getAllVerificationsForFarmer = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { researchCenter, username } = request.query;

    const verifications = await this.verification.find({ researchCenter, username });

    if (verifications && verifications.length > 0) {
      response.status(200).json({
        success: true,
        data: {
          verifications
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

  //get single verification request by research center and username
  private getSingleVerification = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { researchCenter, verificationId } = request.query;

    const verification = await this.verification.findOne({ researchCenter, verificationId });

    if (verification) {
      response.status(200).json({
        success: true,
        data: {
          verification
        }
      });
    } else {
      next(new VerificationNotFoundException(verificationId))
    }
  }
}
