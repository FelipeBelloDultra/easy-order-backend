import { HttpError } from "~/core/errors/http-error";

export class InvalidEmailPasswordCombination extends HttpError {
  constructor() {
    super("Invalid email/password combination", 401);
  }
}
