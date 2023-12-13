import { NextFunction, Request, Response } from "express";
import { createCommander, createCommanderAsset } from "./service";
import { Commander, CommanderAssets } from "@lotr-rtw/service-types";

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


export const commanderAsset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commanderAsset = req.body as CommanderAssets

    if (!commanderAsset) {
      throw new Error("No commander sent in request.");
    }

    const commanderAssetCreated = await createCommanderAsset(commanderAsset);
    res.json(commanderAssetCreated);
  } catch (error) {
    next(error);
  }
};
