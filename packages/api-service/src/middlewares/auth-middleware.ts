import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors";

const skipPaths = ["/login", "/register", "/logout", "/health"];

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (skipPaths.includes(req.path)) {
    return next();
  }

  if (!req.session.userId) {
    return next(new AuthenticationError());
  }

  next();
};
