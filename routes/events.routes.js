const { Router } = require("express");
const {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events.controller");
const { validarJWT } = require("../token/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  validationTitle,
  validationStart,
  validationEnd,
} = require("../validations/events.checks");

const router = Router();

router.use(validarJWT);

router.get("/obtenerEventos", obtenerEventos);
router.post(
  "/crearEvento",
  [validationTitle, validationStart, validationEnd, validarCampos],
  crearEvento
);
router.put("/actualizarEvento/:id", actualizarEvento);
router.delete("/eliminarEvento/:id", eliminarEvento);

module.exports = router;
