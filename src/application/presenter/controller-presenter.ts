import { type Response } from "express";

export function controllerPresenter(response: Response) {
  return {
    created(): Response {
      return response.status(201).send();
    },
    ok<T>(data: T): Response {
      return response.status(200).json({ data });
    },
    fail(status: number, message: string, errors: Array<any> = []): Response {
      return response.status(status).json({
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
