const { response } = require("express");
const eventModel = require("../models/event.model");

const obtenerEventos = async (req, res = response) => {
  const eventos = await eventModel.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    msg: "Eventos obtenidos!",
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new eventModel(req.body);

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
    const evento = await eventModel.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe!",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene autorizacion!",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await eventModel.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Evento actualizado!",
      eventoActualizado,
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
    const evento = await eventModel.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe!",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene autorizacion!",
      });
    }

    await eventModel.findByIdAndDelete(eventoId);

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
