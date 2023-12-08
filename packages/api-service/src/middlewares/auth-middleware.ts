import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    return next(new AuthenticationError());
  }
  req.userId = req.session.userId;

  next();
};
