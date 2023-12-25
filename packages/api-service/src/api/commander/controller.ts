import { NextFunction, Request, Response } from "express";
import * as service from "./service";

export async function getCommanders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const commanders = await service.getAllCommanders();
    res.json(commanders);
  } catch (error) {
    next(error);
  }
}

export async function getCommanderById(req: Request,
  res: Response,
  next: NextFunction) {
  try {
    const commanderId = req.params.id;
    const commander = await service.getCommanderById(commanderId);
    if (!commander) {
      throw new Error(`Commander with id ${commanderId} not found.`)
    }

    res.json(commander);
  } catch (error) {
    next(error);
  }
}