import * as zod from "zod";
import { type NextFunction, type Request, type Response } from "express";

import { InvalidData } from "./errors/invalid-data";

const schemaToCreateOrder = zod.object({
  client: zod.object({
    id: zod.string(),
  }),
  products: zod.array(
    zod.object({
      productId: zod.string(),
      quantity: zod.number(),
    })
  ),
});

export function validateCreateOrder(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { client, products } = req.body;

  try {
    schemaToCreateOrder.parse({ client, products });

    return next();
  } catch (error) {
    if (error instanceof zod.ZodError) {
      throw new InvalidData(error.errors);
    }
  }
}
