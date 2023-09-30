import * as zod from "zod";
import { type NextFunction, type Request, type Response } from "express";

import { InvalidData } from "./errors/invalid-data";

const schemaToCreateProduct = zod.object({
  name: zod.string().min(5).max(255),
  description: zod.string().min(5).max(255).optional(),
  price: zod.number(),
});

export function validateCreateProduct(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { name, price, description } = req.body;

  const result = schemaToCreateProduct.safeParse({
    name,
    price,
    description,
  });

  if (!result.success) {
    throw new InvalidData(result.error.flatten().fieldErrors);
  }

  return next();
}
