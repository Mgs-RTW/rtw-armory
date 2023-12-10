import { NextFunction, Request, Response } from "express";
import { createCommander } from "./service";
import { Commander } from "@lotr-rtw/service-types";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commander = req.body as Commander;
    if (!commander) {
      throw new Error("No commander sent in request.");
    }
    const commanderCreated = await createCommander(commander);
    res.json(commanderCreated);
  } catch (error) {
    next(error);
  }
};
