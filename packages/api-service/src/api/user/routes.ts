import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import * as controller from "./controller";

export const initUserRoutes = (router: Router) => {
  router.get("/user/me", authMiddleware, controller.getCurrentUser);
};
