import { z } from "zod";
import { BaseEntity } from "../base";
import { createLoadoutSchema } from "./schemas";

export type CreateLoadoutSchema = z.infer<typeof createLoadoutSchema>;

export type ApiBaseLoadout = BaseEntity &
  Omit<CreateLoadoutSchema, "attributes">;

export type ApiLoadout = ApiBaseLoadout & {
};