import { NextFunction, Request, Response } from "express";
import * as service from "./service";

export async function getCommanders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const commanders = await service.getAllCommanders();
    res.json(commanders);
  } catch (error) {
    next(error);
  }
}
