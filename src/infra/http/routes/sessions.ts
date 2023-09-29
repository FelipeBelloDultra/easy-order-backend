import { Router } from "express";

import { SessionController } from "~/modules/user/infra/http/controllers/session-controller";
import { validateCreateSession } from "~/modules/user/infra/http/middlewares/validate-create-session";

import { ensureAuthenticatedMiddleware } from "../middlewares/ensure-authenticated.middleware";

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post("/", validateCreateSession, sessionController.create);

sessionRouter.post(
  "/me",
  ensureAuthenticatedMiddleware,
  sessionController.show
);

export { sessionRouter };
