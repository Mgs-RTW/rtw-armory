import { Router } from "express";
import * as controller from "./controller";

export const initAuthRoutes = (router: Router) => {
  router.post("/login", controller.signInUser);
  router.post("/register", controller.signUpUser);
};
