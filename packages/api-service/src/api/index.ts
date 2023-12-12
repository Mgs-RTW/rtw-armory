import express from "express";
import { initAuthRoutes } from "./auth/routes";
import { initPublicCommanderRoutes } from "./commander/routes";
import { initPublicGearRoutes } from "./gear/routes";
import { initUserRoutes } from "./user/routes";

const router = express.Router();

initAuthRoutes(router);
initUserRoutes(router);
initPublicCommanderRoutes(router);
initPublicGearRoutes(router);

export default router;
