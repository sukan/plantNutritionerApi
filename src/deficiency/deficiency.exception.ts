import HttpException from "../shared/exceptions/HttpException";

export class DeficiencyAlreadyExistException extends HttpException {
  constructor(deficiency: string) {
    super(
      400,
      `${deficiency} already exists as a deficiency.`
    );
  }
}

