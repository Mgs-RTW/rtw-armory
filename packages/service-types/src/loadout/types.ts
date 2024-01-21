import { z } from "zod";
import { BaseEntity } from "../base";
import { createLoadoutGearSchema, createLoadoutSchema } from "./schemas";

export type CreateLoadoutSchema = z.infer<typeof createLoadoutSchema>;

export type ApiLoadout = BaseEntity &
  CreateLoadoutSchema;

export type ApiLoadoutGear = BaseEntity & z.infer<typeof createLoadoutGearSchema>

export type ApiLoadoutGearSkill = BaseEntity & {
  loadOutGearId: string,
  gearSkillId: string
}

export type ApiLoadoutGearAdjustment = BaseEntity & {
  gearId: string,
  strengths: string,
  refinements: string
}