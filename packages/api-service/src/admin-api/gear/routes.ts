import { Router } from "express";
import * as controller from "./controller";

export const initGearRoutes = (router: Router) => {
  router.route("/gear").get(controller.getGear).post(controller.createGear);
  router
    .route("/gearskill")
    .get(controller.getGearSkills)
    .post(controller.createGearSkill);
};
