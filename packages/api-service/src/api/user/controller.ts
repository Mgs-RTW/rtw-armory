import { NextFunction, Request, Response } from "express";
import * as service from "./service";

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await service.getUserById(req.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
