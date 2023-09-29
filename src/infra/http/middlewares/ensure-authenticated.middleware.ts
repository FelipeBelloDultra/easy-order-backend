import { NextFunction, Request, Response } from "express";
import { Jwt } from "~/core/domain/jwt";
import { HttpError } from "~/core/errors/http-error";

export function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["x-access-token"] as string | null;

  if (!token) {
    throw new HttpError("JWT token is missing", 401);
  }

  const result = Jwt.decodeToken(token);

  req.user = {
    id: result.id,
    email: result.email,
  };

  return next();
}
