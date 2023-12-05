import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.json({ message: "test" });
});

app.get("/readiness", (req, res) => {
  res.status(200).send("OK");
});

app.use(express.json());

export default app;
