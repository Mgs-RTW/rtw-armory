import express from "express";
import { initGearRoutes } from "./gear/routes";
import { initCommanderRoutes } from "./commander/routes";
import { initRaceRoutes } from "./race/routes";
import { initFileRoutes } from "./file/routes";

const router = express.Router();
initGearRoutes(router);
initCommanderRoutes(router);
initRaceRoutes(router);
initFileRoutes(router);

export default router;
