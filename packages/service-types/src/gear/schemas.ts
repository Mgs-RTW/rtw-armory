import { z } from "zod";

export const createGearAttributesSchema = z.object({
  target: z.enum(["unit", "commander"]),
  modifier: z.enum(["attack", "focus", "defense"]),
  amount: z.string(),
});



export const gearSkillSchema = z.object({
  name: z.string(),
  target: z.enum(["unit", "commander"]),
  modifier: z.enum(["attack", "focus", "defense"]),
  minAmount: z.string(),
  maxAmount: z.string(),
});

export const createGearSchema = z.object({
  raceIds: z.array(z.string().uuid()),
  name: z.string(),
  description: z.string(),
  slot: z.enum(["head", "hand", "armour", "accessory", "relic"]),
  rarity: z.enum(["flawless", "exquisite", "superior", "fine", "unique"]),
  attributes: z.array(createGearAttributesSchema),
});
