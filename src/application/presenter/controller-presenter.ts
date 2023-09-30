import { type Response } from "express";
import { type HttpErrors } from "~/core/errors/http-error";

export function controllerPresenter(response: Response) {
  return {
    created(): Response {
      return response.status(201).send();
    },
    ok<T>(data: T): Response {
      return response.status(200).json({ error: {}, data });
    },
    fail(status: number, message: string, errors: HttpErrors = {}): Response {
      return response.status(status).json({
        data: {},
        error: {
          code: status,
          status: "error",
          message: message,
          errors,
        },
      });
    },
  };
}
