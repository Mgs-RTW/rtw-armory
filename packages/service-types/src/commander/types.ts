import { z } from "zod";
import { BaseEntity } from "../base";
import {
  createCommanderAttributesSchema,
  createCommanderSchema,
} from "./schemas";

export type CreateCommanderAttributesBody = Required<
  z.infer<typeof createCommanderAttributesSchema>
>;
export type CreateCommanderBody = Required<
  z.infer<typeof createCommanderSchema>
>;
export type CommanderAssets = {
  imageUrl: string;
  avatarUrl: string;
};

export type ApiCommanderAttributes = BaseEntity & CreateCommanderAttributesBody;
export type ApiCommanderAssets = BaseEntity & CommanderAssets;
export type ApiBaseCommander = BaseEntity &
  Omit<CreateCommanderBody, "baseData" | "assets">;

export type ApiCommander = ApiBaseCommander & {
  baseData: ApiCommanderAttributes;
  assets: ApiCommanderAssets;
};
