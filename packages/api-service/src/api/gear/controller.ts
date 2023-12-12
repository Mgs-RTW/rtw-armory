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
    const gear = await service.getGearBySlot(slot);
    res.json(gear);
  } catch (error) {
    next(error);
  }
};
