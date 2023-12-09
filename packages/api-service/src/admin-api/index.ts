import express from "express";
import { initGearRoutes } from "./gear/routes";
import { initCommanderRoutes } from "./commander/routes"
import { initRaceRoutes } from './race/routes'

const router = express.Router();

initGearRoutes(router);
initCommanderRoutes(router);
initRaceRoutes(router);

export default router;
