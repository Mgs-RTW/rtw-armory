import { Router } from "express";
import * as controller from "./controller";

export const initPublicGearRoutes = (router: Router) => {
  router.route("/loadout/:id").get(controller.getLoadoutById);
};
