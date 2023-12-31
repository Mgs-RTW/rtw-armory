import { Router } from "express";
import * as controller from "./controller";

export function initPublicCommanderRoutes(router: Router) {
  router.route("/commanders").get(controller.getCommanders);
  router.route("/commanders/:id").get(controller.getCommanderById)
}
