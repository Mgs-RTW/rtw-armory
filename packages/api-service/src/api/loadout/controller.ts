import { Request, Response, NextFunction } from "express";

export const getLoadoutById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loadoutId = req.params.loadoutId as string;
    res.json({ loadoutId });
  } catch (error) {
    next(error);
  }
};
