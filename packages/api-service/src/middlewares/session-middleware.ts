import session from "express-session";
import pgConnect from "connect-pg-simple";
import { databaseConfig } from "../db";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const PgSession = pgConnect(session);

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  name: "session",
  resave: true,
  saveUninitialized: false,
  store: new PgSession({
    conObject: databaseConfig,
    tableName: "session",
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? true : "lax",
  },
});
