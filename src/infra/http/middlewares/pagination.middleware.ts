import { type NextFunction, type Request, type Response } from "express";

import { InvalidPaginationParameters } from "./errors/invalid-pagination-parameters";

export function pagination(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const limit = Number(req.query.limit || "10");
  const page = Number(req.query.page || "1");

  if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
    throw new InvalidPaginationParameters();
  }

  const skip = (page - 1) * limit;
  const take = limit;

  req.query.limit = undefined;
  req.query.page = undefined;

  req.query.skip = String(skip);
  req.query.take = String(take);

  return next();
}
