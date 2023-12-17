import fs from "fs";
import postgres from "postgres";

export const databaseConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  ssl:
    process.env.NODE_ENV === "development"
      ? false
      : {
          rejectUnauthorized: true,
          ca: fs.readFileSync("keys/pg-cert.pem", "utf8").toString(),
        },
};

/*
(method) postgres.PendingQuery<postgres.Row[]>.raw(): postgres.PendingRawQuery<postgres.Row[]>
*/

/*
export const wrapped = (query: postgres.PendingRawQuery<postgres.Row[]>) => {
  console.log(query.)
  return sql
}
*/

export const sql = postgres({
  transform: postgres.camel,
  ...databaseConfig,
});
