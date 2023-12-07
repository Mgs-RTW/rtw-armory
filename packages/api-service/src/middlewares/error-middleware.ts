import { NextFunction, Request, Response } from "express";
import { isAuthenticationError } from "../errors";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAuthenticationError(error)) {
    return res.status(401).json({ message: "Authentication required" });
  }
  return res.status(500).json({ message: "Internal server error" });
};
