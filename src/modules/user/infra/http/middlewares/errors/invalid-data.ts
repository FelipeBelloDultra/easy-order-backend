import { HttpError } from "~/core/errors/http-error";

export class InvalidData extends HttpError {
  constructor(errors: Array<any> = []) {
    super("Validation failed", 422, errors);
  }
}
