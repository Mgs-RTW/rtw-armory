import { z } from "zod";
import { BaseEntity } from "../base";
import { createGearAttributesSchema, createGearSchema } from "./schemas";

export type CreateGearAttributesBody = Required<
  z.infer<typeof createGearAttributesSchema>
>;
export type CreateGearBody = Required<z.infer<typeof createGearSchema>>;
export type GearSlot = CreateGearBody["slot"];

export type ApiGearAttributes = BaseEntity & CreateGearAttributesBody;
export type ApiBaseGear = BaseEntity & Omit<CreateGearBody, "attributes">;
export type ApiGear = ApiBaseGear & {
  attributes: ApiGearAttributes;
  image: string;
};

// TODO: Extract from schema
export interface GearAdjustment extends BaseEntity {
  strengths: number;
  refinements: number;
  gearId: string;
}

export interface GearSkill extends BaseEntity {
  name: string;
  target: CreateGearAttributesBody["target"];
  modifier: CreateGearAttributesBody["modifier"];
  minAmount: number;
  maxAmount: number;
}
