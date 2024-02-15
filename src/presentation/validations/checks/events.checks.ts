import { check } from "express-validator";
import { isDate } from "../../../helpers";

export const validationTitle = check("title", "El titulo es obligatorio")
  .not()
  .isEmpty();

export const validationStart = check(
  "start",
  "La fecha de inicio es obligatoria"
).custom(isDate);

export const validationEnd = check(
  "end",
  "La fecha de finalizacion es obligatoria"
).custom(isDate);
