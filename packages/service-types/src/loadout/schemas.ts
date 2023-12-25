import { z } from "zod";

export const createLoadoutSchema = z.object({
  name: z.string(),
  createdBy: z.string(),
  commanderId: z.string()
});