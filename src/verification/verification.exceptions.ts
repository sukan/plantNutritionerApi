import HttpException from "../shared/exceptions/HttpException";

export class FailToUpdateVerificationException extends HttpException {
  constructor() {
    super(
      400,
      "Failed to update verification request."
    );
  }
}

export class VerificationNotFoundException extends HttpException {
  constructor(verificationId) {
    super(
      400,
      `${verificationId} not found.`
    );
  }
}

export class BlockchainTransactionFailedException extends HttpException {
  constructor() {
    super(
      400,
      "Blockchain transaction failed"
    );
  }
}