import { HttpError } from "~/core/errors/http-error";

export class ClientOrderNotFound extends HttpError {
  constructor() {
    super("Client not exists", 404);
  }
}
