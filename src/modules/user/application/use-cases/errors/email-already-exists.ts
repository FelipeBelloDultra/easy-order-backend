import { HttpError } from "~/core/errors/http-error";

export class EmailAlreadyExists extends HttpError {
  constructor() {
    super("Email already exists", 400);
  }
}
