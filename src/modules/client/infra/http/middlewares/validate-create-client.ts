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

  try {
    schemaToCreateClient.parse({ name, document });

    return next();
  } catch (error) {
    if (error instanceof zod.ZodError) {
      throw new InvalidData(error.errors);
    }
  }
}
