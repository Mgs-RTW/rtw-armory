import app from "./app";

const port = Number(process.env.PORT) || 8000;

const server = app.listen(() => {
  console.log(`api-service running on ${port}`);
});

process.on("SIGTERM", () => {
  server.close((error) => {
    if (error) {
      console.error("Error shutting down server: ", error.message);
    } else {
      console.log("api-service shut down successfully");
    }
  });
});
