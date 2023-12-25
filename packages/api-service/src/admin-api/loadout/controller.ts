import { NextFunction, Request, Response } from "express";

export const createLoadout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(undefined);
  } catch (error) {
    next(error);
  }
};
