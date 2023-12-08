import fs from "fs";
import postgres from "postgres";

export const databaseConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("keys/pg-cert.pem", "utf8").toString(),
  },
};

export const sql = postgres({
  transform: postgres.camel,
  ...databaseConfig,
});
