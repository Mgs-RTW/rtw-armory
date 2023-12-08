import app from "./app";
import pg from "pg";
import fs from "fs";
import { runDatabaseMigrations } from "./db";

const port = Number(process.env.PORT) || 8000;

/*
const pool = new pg.Pool({
  user: "avnadmin",
  password: "AVNS_g2eLQdMdem6BwyU5jmZ",
  host: "rtw-armory-rtw-armory.a.aivencloud.com",
  port: 10143,
  database: "defaultdb",
  ssl: {
    ca: fs.readFileSync("keys/pg-cert.pem", "utf8").toString(),
  },
});

pool.on("connect", () => console.log("Connected to pool"));

pool.query("SELECT * FROM migration").then((res) => console.log(res.rows));
*/

/*
const client = new pg.Client({
  user: "avnadmin",
  password: "AVNS_g2eLQdMdem6BwyU5jmZ",
  host: "rtw-armory-rtw-armory.a.aivencloud.com",
  port: 10143,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false,
  },
});
*/

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
