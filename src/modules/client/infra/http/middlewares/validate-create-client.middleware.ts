import * as zod from "zod";
import { type NextFunction, type Request, type Response } from "express";

import { InvalidData } from "./errors/invalid-data";

const schemaToCreateClient = zod.object({
  name: zod.string().min(5).max(255),
  document: zod
    .string()
    .regex(
      new RegExp(
        /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/
      ),
      "Invalid CPF/CNPJ format"
    ),
});

export function validateCreateClient(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { name, document } = req.body;

  const result = schemaToCreateClient.safeParse({ name, document });

  if (!result.success) {
    throw new InvalidData(result.error.flatten().fieldErrors);
  }

  return next();
}
