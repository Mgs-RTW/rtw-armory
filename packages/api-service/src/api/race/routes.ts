import { Router } from "express";
import * as controller from "./controller";

export const initPublicRaceRoutes = (router: Router) => {
  router.route("/races").get(controller.getAllRaces);
};
