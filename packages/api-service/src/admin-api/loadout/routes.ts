import { Router } from "express";
import * as controller from "./controller";

export const initLoadoutRoutes = (router: Router) => {
  router.route("/loadout").post(controller.createLoadout)
};
