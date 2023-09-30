import { HttpError, type HttpErrors } from "~/core/errors/http-error";

export class ValidationFailed extends HttpError {
  constructor(errors: HttpErrors = {}) {
    super("Validation failed", 422, errors);
  }
}
