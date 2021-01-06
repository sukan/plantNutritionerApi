import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import Controller from "../shared/interfaces/controller.interface";
import validationMiddleware from "../shared/middleware/validation.middleware";
import authMiddleware from "../shared/middleware/auth.middleware";
import userModel from "./authentication.model";

import { JWT_SECRET } from "../shared/config/keys";
import {
  UserNotFoundException,
  WrongCredentialsException,
  UserAlreadyExistsException,
} from "./authentication.exceptions";
import { User, TokenData, DataInToken } from "./authentication.interface";
import { CreateUserDto, LogInDto } from "./authentication.dto";

export default class AuthenticationController implements Controller {
  public router = express.Router();
  private user = userModel;
  private path = "/auth";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.signIn
    );

    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.signUp
    );

    this.router.get(`${this.path}/userData`, authMiddleware, this.getUser);
  }

  //signIn users
  private signIn = async (
    { body: { username, password } }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const user = await this.user.findOne({ username }).select({
      password: 1,
      username: 1,
      role: 1,
      gender: 1,
      researchCenter: 1
    });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        const token = this.createToken(user);
        response.send({
          success: true,
          data: {
            token,
            gender: user.gender,
            role: user.role,
            username,
            researchCenter: user.researchCenter
          }
        });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new UserNotFoundException());
    }
  };

  //signUp users with different roles
  private signUp = async (
    {
      body: {
        username,
        gender,
        role,
        password,
        researchCenter
      },
    }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    if (await this.user.findOne({ username })) {
      next(new UserAlreadyExistsException(username));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData: {
        username: string;
        password: string;
        gender: string;
        role: string;
        researchCenter: string
      } = {
        username,
        password: hashedPassword,
        gender,
        role,
        researchCenter
      };

      const user = await this.user.create(userData);

      response.send({
        success: true,
        data: {
          user
        }
      });
    }
  };

  // get single user details
  private getUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData = await this.user.findOne(request.user).select({
      password: 1,
      username: 1,
      role: 1,
      gender: 1,
      researchCenter: 1
    });

    if (!userData) {
      return response.status(404).json("No User found");
    }
    response.status(200).json({ success: true, data: { username: userData.username, role: userData.role, gender: userData.gender, researchCenter: userData.researchCenter } });
  };


  // get token
  private createToken({ _id, username }: User): TokenData {
    const expiresIn = 31536000;
    const dataStoredInToken: DataInToken = {
      _id,
      username,
    };
    return {
      expiresIn,
      key: jwt.sign(dataStoredInToken, JWT_SECRET, {
        expiresIn,
      }),
    };
  }
}
