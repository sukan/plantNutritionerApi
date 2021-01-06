import { NextFunction, Response, Request } from "express";
import { BlockchainTransactionFailedException } from "./verification.exceptions";
import axios from "axios";

export async function VerificationRequestTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const {
    verificationId,
    deficiency,
    stage,
    researchCenter,
    username,
    checked,
  } = request.body;

  axios
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
    .catch(() => next(new BlockchainTransactionFailedException()));
}

export async function VerificationResponseTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const {
    verificationId,
    researchCenter,
    username,
    verificationNote,
    stage,
  } = request.body;

  axios
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
    .catch(() => next(new BlockchainTransactionFailedException()));
}
