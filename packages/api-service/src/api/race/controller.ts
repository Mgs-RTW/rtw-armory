import { NextFunction, Request, Response } from "express";
import * as service from "./service";

export async function getAllRaces(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const races = await service.getRaces();
    res.json(races);
  } catch (error) {
    next(error);
  }
}
