import { NextFunction, Request, Response } from "express";
import { getRaces } from "./service";

export const get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commander = await getRaces();
    res.json(commander);
  } catch (error) {
    next(error);
  }
};
