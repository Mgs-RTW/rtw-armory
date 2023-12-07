import express from "express";
import { initGearRoutes } from "./gear/routes";

const router = express.Router();

initGearRoutes(router);

export default router;
