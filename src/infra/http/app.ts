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

export class HttpApp {
  public static init() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);

    app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof HttpError) {
          return response.status(err.statusCode).json({
            code: err.statusCode,
            status: "error",
            message: err.message,
            errors: err.errors,
          });
        }

        console.error(err);

        return response.status(500).json({
          code: 500,
          status: "error",
          message: "Internal server error",
          errors: [],
        });
      }
    );

    app.listen(3000);
  }
}
