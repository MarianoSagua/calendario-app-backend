import { Request, Response } from "express";
import { EventModel } from "../../data";

interface AuthenticatedRequest extends Request {
  uid?: string;
  name?: string;
}

export class EventsController {
  constructor() {}

  static async getEvents(req: AuthenticatedRequest, res: Response) {
    const eventos = await EventModel.find().populate("user", "name");

    res.status(200).json({
      ok: true,
      msg: "Events obtained!!",
      eventos,
    });
  }

  static async createEvent(req: AuthenticatedRequest, res: Response) {
    const evento = new EventModel(req.body);

    try {
      // if (!req.uid) {
      //   return res.status(400).json({
      //     ok: false,
      //     msg: "User identifier (uid) is not defined",
      //   });
      // }

      // evento.user = req.uid;
      // const eventoGuardado = await evento.save();

      res.status(200).json({
        // ok: true,
        // msg: "Event created!!",
        // eventoGuardado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Please talk to the administrator!!",
      });
    }
  }

  static async updateEvent(req: AuthenticatedRequest, res: Response) {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
      const evento = await EventModel.findById(eventoId);

      if (!evento) {
        return res.status(404).json({
          ok: false,
          msg: "The event doesn't exist!!",
        });
      }

      // if (evento.user.toString() !== uid) {
      //   return res.status(401).json({
      //     ok: false,
      //     msg: "You don't have authorization!!",
      //   });
      // }

      const nuevoEvento = {
        ...req.body,
        user: uid,
      };

      const eventoActualizado = await EventModel.findByIdAndUpdate(
        eventoId,
        nuevoEvento,
        { new: true }
      );

      res.status(200).json({
        ok: true,
        msg: "Event updated!!",
        eventoActualizado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Please talk to the administrator!!",
      });
    }
  }

  static async deleteEvent(req: AuthenticatedRequest, res: Response) {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
      const evento = await EventModel.findById(eventoId);

      if (!evento) {
        return res.status(404).json({
          ok: false,
          msg: "The event doesn't exist!!",
        });
      }

      // if (evento.user.toString() !== uid) {
      //   return res.status(401).json({
      //     ok: false,
      //     msg: "You don't have authorization!!",
      //   });
      // }

      await EventModel.findByIdAndDelete(eventoId);

      res.status(200).json({
        ok: true,
        msg: "Event deleted!!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Please talk to the administrator!!",
      });
    }
  }
}
