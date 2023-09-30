import * as zod from "zod";
import { type NextFunction, type Request, type Response } from "express";

import { InvalidData } from "./errors/invalid-data";

const schemaToCreateUser = zod.object({
  name: zod.string().min(5).max(255),
  password: zod.string().min(8).max(255),
  email: zod.string().max(255).email("Invalid email format"),
});

export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { name, email, password } = req.body;

  const result = schemaToCreateUser.safeParse({ name, email, password });

  if (!result.success) {
    throw new InvalidData(result.error.flatten().fieldErrors);
  }

  return next();
}
