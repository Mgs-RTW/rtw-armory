import { NextFunction, Request, Response } from "express";
import * as service from "./service";

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await service.signInUser(email, password);

    req.session.regenerate((error) => {
      if (error) {
        console.debug(`Failed to regenerate session for ${user.id}: ${error}`);
      }

      req.session.userId = user.id;
      const { password: _, ...rest } = user;
      res.json(rest);
    });
  } catch (error) {
    next(error);
  }
};

export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const newUser = await service.registerUser(email, password);
    const { password: _, ...rest } = newUser;
    res.json(rest);
  } catch (error) {
    next(error);
  }
};
