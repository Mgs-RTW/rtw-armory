import { NextFunction, Request, Response } from "express";
import { createGearSchema, GearSkill } from "@lotr-rtw/service-types";
import * as service from "./service";
import { uploadFile } from "../../util";

export const createGear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gear = createGearSchema.parse(req.body);
    if (!req.file) {
      throw new Error("Gear image missing in payload");
    }
    const { url } = await uploadFile({ area: "gear", file: req.file });
    const gearCreated = await service.createGear(gear, url);
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
