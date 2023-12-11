import express from "express";
import { initAuthRoutes } from "./auth/routes";
import { initPublicCommanderRoutes } from "./commander/routes";
import { initUserRoutes } from "./user/routes";

const router = express.Router();

initAuthRoutes(router);
initUserRoutes(router);
initPublicCommanderRoutes(router);

export default router;
