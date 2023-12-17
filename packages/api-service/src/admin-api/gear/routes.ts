import { Router } from "express";
import { multerMiddleware } from "../../middlewares";
import * as controller from "./controller";

export const initGearRoutes = (router: Router) => {
  router
    .route("/gear")
    .post(multerMiddleware.single("image"), controller.createGear);
  router
    .route("/gearskill")
    .get(controller.getGearSkills)
    .post(controller.createGearSkill);
};
