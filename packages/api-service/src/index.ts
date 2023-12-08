import app from "./app";
import { runDatabaseMigrations } from "./db";

const port = Number(process.env.PORT) || 8000;

runDatabaseMigrations()
  .then(() => {
    const server = app.listen(port, () => {
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
  })
  .catch((error) => {
    console.error(`Something went wrong :`, error);
    process.exit(1);
  });
