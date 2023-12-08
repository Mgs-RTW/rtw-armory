import { NextFunction, Request, Response } from "express";
import { UserRole } from "@lotr-rtw/service-types";
import { sql } from "../db";
import { AuthorizationError } from "../errors";

export function requiresRoleMiddleware(role: UserRole) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const [userRole]: [{ role: UserRole }?] = await sql`
      SELECT role FROM users WHERE id = ${req.userId}
    `;

    if (userRole?.role !== role) {
      return next(new AuthorizationError());
    }

    next();
  };
}
