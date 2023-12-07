import express from "express";
import adminRouter from "./admin-api";
import { errorMiddleware } from "./middlewares";

const app = express();
app.use(express.json());

app.use("/admin", adminRouter);

app.get("/health", (req, res) => {
  res.send("Account service is OK");
});

app.get("/readiness", (req, res) => {
  res.status(200).send("OK");
});

app.use(errorMiddleware);

export default app;
