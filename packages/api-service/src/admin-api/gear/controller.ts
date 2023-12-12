import { NextFunction, Request, Response } from "express";
import * as service from "./service";
import { Gear, GearSkill } from "@lotr-rtw/service-types";

export const getGear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gear = await service.getGear();
    res.json(gear);
  } catch (error) {
    next(error);
  }
};

export const createGear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gear = req.body as Gear;
    if (!gear) {
      throw new Error("No gear sent in request.");
    }
    const gearCreated = await service.createGear(gear);
    res.json(gearCreated);
  } catch (error) {
    next(error);
  }
};

export const getGearSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gearSkills = await service.getGearSkills();
    res.json(gearSkills);
  } catch (error) {
    next(error);
  }
};

export const createGearSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gearSkill = req.body as GearSkill;
    console.log(gearSkill);
    if (!gearSkill) {
      throw new Error("No gear sent in request.");
    }
    const gearCreated = await service.createGearSkill(gearSkill);
    res.json(gearCreated);
  } catch (error) {
    next(error);
  }
};

export const createGearSkillToGearLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gearId, gearSkillId } = req.body;
    if (!gearId || !gearSkillId) {
      throw new Error("Inavlid request.");
    }
    const gearCreated = await service.createGearSkillToGearLink(
      gearId,
      gearSkillId
    );
    res.json(gearCreated);
  } catch (error) {
    next(error);
  }
};
