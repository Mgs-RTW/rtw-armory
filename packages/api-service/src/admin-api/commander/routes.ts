import { Router } from "express";
import * as controller from "./controller";

export const initCommanderRoutes = (router: Router) => {
  router.route("/commander").post(controller.create);
};
