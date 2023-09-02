const { Router } = require("express");
const {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validarJWT);

router.get("/obtenerEventos", obtenerEventos);
router.post(
  "/crearEvento",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put("/actualizarEvento/:id", actualizarEvento);
router.delete("/eliminarEvento/:id", eliminarEvento);

module.exports = router;
