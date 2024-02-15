import { check } from "express-validator";

export const validationName = check("name", "Name is required !!")
  .not()
  .isEmpty();

export const validationEmail = check("email", "Email is required !!").isEmail();

export const validationPassword = check("password", "Password is required !!")
  .not()
  .isEmpty();

export const validationPasswordMinLength = check(
  "password",
  "Password must contain at least 6 characters!!"
).isLength({
  min: 6,
});
