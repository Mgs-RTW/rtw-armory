import { z } from "zod";

export const createCommanderAttributesSchema = z.object({
  minDamage: z.string(),
  maxDamage: z.string(),
  hp: z.string(),
  command: z.string(),
  attack: z.string(),
  defense: z.string(),
  focus: z.string(),
  initiative: z.string(),
});

export const createCommanderSchema = z.object({
  raceId: z.string().uuid(),
  name: z.string(),
  tier: z.enum(["t1", "t2", "t3"]),
  alignment: z.enum(["evil", "good"]),
  baseData: createCommanderAttributesSchema,
});
