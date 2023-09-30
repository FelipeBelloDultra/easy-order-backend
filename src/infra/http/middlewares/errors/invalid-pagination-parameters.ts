import { HttpError } from "~/core/errors/http-error";

export class InvalidPaginationParameters extends HttpError {
  constructor() {
    super("Invalid pagination parameters", 400);
  }
}
