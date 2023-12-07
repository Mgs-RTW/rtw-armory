import express from "express";

const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "test" });
});

app.get("/health", (req, res) => {
  res.send("Account service is OK");
});

app.get("/readiness", (req, res) => {
  res.status(200).send("OK");
});

export default app;
