import { HttpError } from "~/core/errors/http-error";

export class ValidationFailed extends HttpError {
  constructor(errors: Array<any> = []) {
    super("Validation failed", 422, errors);
  }
}
