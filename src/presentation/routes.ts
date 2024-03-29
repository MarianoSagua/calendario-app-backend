import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { EventsRoutes } from "./events/events.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/events", EventsRoutes.routes);

    return router;
  }
}
