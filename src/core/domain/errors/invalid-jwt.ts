import { HttpError } from "~/core/errors/http-error";

export class InvalidJwt extends HttpError {
  constructor() {
    super("The JWT token is invalid", 401);
  }
}
