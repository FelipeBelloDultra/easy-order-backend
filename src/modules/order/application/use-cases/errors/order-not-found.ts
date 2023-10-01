import { HttpError } from "~/core/errors/http-error";

export class OrderNotFound extends HttpError {
  constructor() {
    super("Order not found", 404);
  }
}
