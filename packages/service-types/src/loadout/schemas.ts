import { z } from "zod";

export const createLoadoutGearAdjustmentSchema = z.object({
  strengths: z.string(),
  refinements: z.string(),
});

export const createLoadoutGearSchema = z.object({
  gearId: z.string().uuid(),
  gearAdjustments: createLoadoutGearAdjustmentSchema,
  gearSkillId: z.string().uuid()
})



export const createLoadoutSchema = z.object({
  name: z.string(),
  createdBy: z.string(),
  commanderId: z.string().uuid(),
  gear: z.array(createLoadoutGearSchema),
  userId: z.string().uuid()
});


