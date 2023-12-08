import { NextFunction, Request, Response } from "express";
import {
  isAuthenticationError,
  isAuthorizationError,
  isInvalidCredentialsError,
} from "../errors";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error: ", error);
  if (res.headersSent) {
    return next(error);
  }
  if (isAuthenticationError(error)) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (isAuthorizationError(error)) {
    return res.status(403).json({ message: "Insufficient permissions" });
  }
  if (isInvalidCredentialsError(error)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  return res.status(500).json({ message: "Internal server error" });
};
