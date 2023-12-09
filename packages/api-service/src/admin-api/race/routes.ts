import { Router } from "express";
import * as controller from "./controller";

export const initRaceRoutes = (router: Router) => {
  router.route("/race").get(controller.get);
};
