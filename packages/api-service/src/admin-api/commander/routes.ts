import { Router } from "express";
import { multerMiddleware } from "../../middlewares";
import * as controller from "./controller";

export const initCommanderRoutes = (router: Router) => {
  router
    .route("/commander")
    .post(
      multerMiddleware.fields([{ name: "avatar" }, { name: "image" }]),
      controller.create
    );
};
