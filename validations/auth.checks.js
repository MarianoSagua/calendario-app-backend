const { check } = require("express-validator");

exports.validationName = check("name", "El nombre es obligatorio")
  .not()
  .isEmpty();

exports.validationEmail = check("email", "El email es obligatorio").isEmail();

exports.validationPassword = check("password", "La contraseña es obligatoria")
  .not()
  .isEmpty();

exports.validationPasswordMinLength = check(
  "password",
  "La contraseña debe tener al menos 6 caracteres"
).isLength({
  min: 6,
});
