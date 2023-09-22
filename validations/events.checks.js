const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

exports.validationTitle = check("title", "El titulo es obligatorio")
  .not()
  .isEmpty();

exports.validationStart = check(
  "start",
  "La fecha de inicio es obligatoria"
).custom(isDate);

exports.validationEnd = check(
  "end",
  "La fecha de finalizacion es obligatoria"
).custom(isDate);
