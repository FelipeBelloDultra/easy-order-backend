import { Router } from "express";

import { SessionController } from "~/modules/user/infra/http/session-controller";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensure-authenticated.middleware";

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post("/", sessionController.create);
sessionRouter.post(
  "/me",
  ensureAuthenticatedMiddleware,
  sessionController.show
);

export { sessionRouter };
