import HttpException from "../shared/exceptions/HttpException";

export class ResearchAlreadyExistException extends HttpException {
  constructor(researchId: string) {
    super(
      400,
      `${researchId} already exists.`
    );
  }
}

export class ResearchDeficiencyAlreadyExistsException extends HttpException {
  constructor(deficiency: string) {
    super(
      400,
      `A research for ${deficiency} is already exists`
    );
  }
}

export class ResearchCreationFailedException extends HttpException {
  constructor() {
    super(
      400,
      "Failed to create Research."
    );
  }
}

export class ResearchNotFoundException extends HttpException {
  constructor() {
    super(
      400,
      "Research not found."
    );
  }
}



