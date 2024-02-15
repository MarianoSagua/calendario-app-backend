import { Router } from "express";
import { jwtValidator } from "../../config";
import {
  validationTitle,
  validationStart,
  validationEnd,
} from "../validations/checks/events.checks";
import { fieldValidation } from "../validations/middlewares/fieldValidation";
import { EventsController } from "./events.controller";

export class EventsRoutes {
  static get routes() {
    const router = Router();

    router.use(jwtValidator);
    router.get("/get-events", EventsController.getEvents);
    router.post(
      "/create-event",
      [validationTitle, validationStart, validationEnd, fieldValidation],
      EventsController.createEvent
    );
    router.put("/update-event/:id", EventsController.updateEvent);
    router.delete("/delete-event/:id", EventsController.deleteEvent);

    return router;
  }
}
