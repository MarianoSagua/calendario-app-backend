import { Router } from "express";
import { jwtValidator } from "../../config";
import {
  validationName,
  validationEmail,
  validationPassword,
  validationPasswordMinLength,
} from "../validations/checks/auth.checks";
import { fieldValidation } from "../validations/middlewares/fieldValidation";
import { AuthController } from "./auth.controller";
import { MongoUserDataSource, UserRepositoryImpl } from "../../infrastructure";

const mongoUserRepository = new UserRepositoryImpl(new MongoUserDataSource());

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const controller = new AuthController(mongoUserRepository);

    router.post(
      "/register",
      [
        validationName,
        validationEmail,
        validationPassword,
        validationPasswordMinLength,
        fieldValidation,
      ],
      controller.registerUser
    );
    router.post(
      "/login",
      [
        validationEmail,
        validationPassword,
        validationPasswordMinLength,
        fieldValidation,
      ],
      controller.loginUser
    );

    router.get("/renew", jwtValidator, controller.renewToken);

    return router;
  }
}
