import { type NextFunction, type Request, type Response } from "express";

import { MissingJwt } from "~/core/domain/errors/missing-jwt";
import { Jwt } from "~/core/domain/jwt";

export function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["x-access-token"] as string | null;

  if (!token) {
    throw new MissingJwt();
  }

  const result = Jwt.decodeToken(token);

  req.user = {
    id: result.id,
    email: result.email,
  };

  return next();
}
