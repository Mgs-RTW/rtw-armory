import { NextFunction, Request, Response } from "express";
import { createCommander } from "./service";
import {
  CreateCommanderBody,
  createCommanderSchema,
} from "@lotr-rtw/service-types";
import { uploadFile } from "../../util";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commander = createCommanderSchema.parse(
      req.body
    ) as CreateCommanderBody;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const [image] = files.image;
    const [avatar] = files.avatar;

    if (!image || !avatar) {
      throw new Error("Missing image or avatar for commander");
    }

    const [imageFile, avatarFile] = await Promise.all([
      uploadFile({ area: "commander", file: image }),
      uploadFile({ area: "commander", file: avatar }),
    ]);

    const commanderCreated = await createCommander(commander, {
      avatarUrl: avatarFile.url,
      imageUrl: imageFile.url,
    });
    res.json(commanderCreated);
  } catch (error) {
    next(error);
  }
};
