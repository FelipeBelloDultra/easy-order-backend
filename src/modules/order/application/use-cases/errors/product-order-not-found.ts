import { HttpError } from "~/core/errors/http-error";

export class ProductOrderNotFound extends HttpError {
  constructor() {
    super("Product not exists", 404);
  }
}
