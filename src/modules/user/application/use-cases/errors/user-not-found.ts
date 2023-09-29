import { HttpError } from "~/core/errors/http-error";

export class UserNotFound extends HttpError {
  constructor() {
    super("User not found", 404);
  }
}
