import { NextFunction, Request, Response } from "express";
import { isAuthenticationError, isInvalidCredentialsError } from "../errors";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAuthenticationError(error)) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (isInvalidCredentialsError(error)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  return res.status(500).json({ message: "Internal server error" });
};
