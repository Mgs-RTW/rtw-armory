import { Request, Response, NextFunction } from "express";
import { GearSlot } from "@lotr-rtw/service-types";
import * as service from "./service";

export const getGearBySlot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slot = req.params.slot as GearSlot;
    const raceId = req.params.raceId as string;
    const gear = await service.getGearBySlot(raceId, slot);
    res.json(gear);
  } catch (error) {
    next(error);
  }
};
