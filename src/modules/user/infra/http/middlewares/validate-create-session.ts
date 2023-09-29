import * as zod from "zod";
import { type NextFunction, type Request, type Response } from "express";

import { InvalidData } from "./errors/invalid-data";

const schemaToCreateSession = zod.object({
  password: zod.string().min(8).max(255),
  email: zod.string().max(255).email("Invalid email format"),
});

export function validateCreateSession(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { email, password } = req.body;

  try {
    schemaToCreateSession.parse({ email, password });

    return next();
  } catch (error) {
    if (error instanceof zod.ZodError) {
      throw new InvalidData(error.errors);
    }
  }
}
