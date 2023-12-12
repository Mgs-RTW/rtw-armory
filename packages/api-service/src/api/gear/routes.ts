import { Router } from "express";
import * as controller from "./controller";

export const initPublicGearRoutes = (router: Router) => {
  router.route("/gear/:slot").get(controller.getGearBySlot);
};
