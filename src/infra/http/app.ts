import "express-async-errors";
import "reflect-metadata";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";

import { HttpError } from "~/core/errors/http-error";

import { router } from "./routes";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class HttpApp {
  public static init() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);

    app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof HttpError) {
          return controllerPresenter(response).fail(
            err.statusCode,
            err.message,
            err.errors
          );
        }

        console.error(err);

        return controllerPresenter(response).fail(500, "Internal server error");
      }
    );

    app.listen(3000);
  }
}
