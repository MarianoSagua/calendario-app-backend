const { response } = require("express");
const Evento = require("../models/EventModel");

const obtenerEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    msg: "Eventos obtenidos!",
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();

    res.status(200).json({
      ok: true,
      msg: "Evento creado!",
      eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      res.status(404).json({
        ok: false,
        msg: "El evento no existe!",
      });
    }

    if (evento.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: "No tiene autorizacion!",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Evento actualizado!",
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      res.status(404).json({
        ok: false,
        msg: "El evento no existe!",
      });
    }

    if (evento.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: "No tiene autorizacion!",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.status(200).json({
      ok: true,
      msg: "Evento eliminado!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
