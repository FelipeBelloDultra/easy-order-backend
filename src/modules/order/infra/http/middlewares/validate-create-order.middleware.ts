import * as zod from "zod";
import { type NextFunction, type Request, type Response } from "express";

import { InvalidData } from "./errors/invalid-data";

const schemaToCreateOrder = zod.object({
  client: zod.object({
    id: zod.string(),
  }),
  products: zod.array(
    zod.object({
      id: zod.string(),
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

  if (!products || !products.length) {
    throw new InvalidData({ products: ["Required"] });
  }

  const result = schemaToCreateOrder.safeParse({ client, products });

  if (!result.success) {
    throw new InvalidData(result.error.flatten().fieldErrors);
  }

  return next();
}
