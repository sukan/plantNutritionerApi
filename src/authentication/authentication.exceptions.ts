import HttpException from "../shared/exceptions/HttpException";

export class UserNotFoundException extends HttpException {
  constructor() {
    super(404, `User not found`);
  }
}

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, `Your username or password is incorrect.`);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(
      400,
      `User with username ${username} already exists.`
    );
  }
}
