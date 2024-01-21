import { NextFunction, Request, Response } from "express";
import * as service from "./service"
import { ApiLoadout, CreateLoadoutSchema, createLoadoutSchema } from '@lotr-rtw/service-types';

export const createLoadout = async (
  req: Request<CreateLoadoutSchema>,
  res: Response<ApiLoadout>,
  next: NextFunction
) => {
  try {
    const createLoadoutBody = createLoadoutSchema.parse(req.body);
    const result = await service.createLoadout(createLoadoutBody)
    res.json(result);
  } catch (error) {
    next(error);
  }
};
