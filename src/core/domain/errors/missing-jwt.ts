import { HttpError } from "~/core/errors/http-error";

export class MissingJwt extends HttpError {
  constructor() {
    super("JWT token is missing", 401);
  }
}
