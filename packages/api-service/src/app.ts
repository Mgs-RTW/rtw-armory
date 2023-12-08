import express from "express";
import adminRouter from "./admin-api";
import apiRouter from "./api";
import {
  authMiddleware,
  errorMiddleware,
  requiresRoleMiddleware,
  sessionMiddleware,
} from "./middlewares";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(sessionMiddleware);

app.use(apiRouter);
app.use("/admin", authMiddleware, requiresRoleMiddleware("admin"), adminRouter);

app.get("/health", (req, res) => {
  res.send("Account service is OK");
});

app.get("/readiness", (req, res) => {
  res.status(200).send("OK");
});

app.use(errorMiddleware);

export default app;
