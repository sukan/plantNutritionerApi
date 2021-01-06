import HttpException from "../shared/exceptions/HttpException";

export class ProductAlreadyExistException extends HttpException {
  constructor(product: string) {
    super(
      400,
      `${product} already exists.`
    );
  }
}

export class ProductCreationFailedException extends HttpException {
  constructor() {
    super(
      400,
      "Failed to create product."
    );
  }
}

