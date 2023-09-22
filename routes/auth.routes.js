const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth.controller");
const { validarJWT } = require("../token/validar-jwt");
const {
  validationName,
  validationEmail,
  validationPassword,
  validationPasswordMinLength,
} = require("../validations/auth.checks");

const router = Router();

router.post(
  "/register",
  [
    validationName,
    validationEmail,
    validationPassword,
    validationPasswordMinLength,
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    validationEmail,
    validationPassword,
    validationPasswordMinLength,
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
