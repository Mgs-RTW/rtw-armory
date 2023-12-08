import express from "express";
import { initAuthRoutes } from "./auth/routes";
import { initUserRoutes } from "./user/routes";

const router = express.Router();

initAuthRoutes(router);
initUserRoutes(router);

export default router;
