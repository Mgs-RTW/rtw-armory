import express from "express";
import adminRouter from "./admin-api";
import apiRouter from "./api";
import {
  authMiddleware,
  errorMiddleware,
  multerMiddleware,
  requiresRoleMiddleware,
  sessionMiddleware,
} from "./middlewares";
import { extractAvailableEndpointsFromRouters } from "./util/express";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use((req, res, next) => {
  const uAgent = req.headers["user-agent"];
  if (!uAgent?.includes("kube")) {
    console.log("Request going to ", req.url);
  }
  next();
});

app.use("/api", apiRouter);
app.use(
  "/api/admin",
  authMiddleware,
  requiresRoleMiddleware("admin"),
  adminRouter
);

const availableRoutes = extractAvailableEndpointsFromRouters([
  { prefix: "/api/admin", router: adminRouter },
  { router: apiRouter },
]);

console.log("Available routes", availableRoutes);

app.get("/health", (req, res) => {
  res.send("Account service is OK");
});

app.get("/", (req, res) => {
  res.send("Account service is OK");
});

app.get("/readiness", (req, res) => {
  res.status(200).send("OK");
});

app.use(errorMiddleware);

export default app;
