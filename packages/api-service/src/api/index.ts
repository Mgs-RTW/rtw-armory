import express from "express";
import { initAuthRoutes } from "./auth/routes";

const router = express.Router();

initAuthRoutes(router);

export default router;
