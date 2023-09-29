import { Router } from "express";

import { ensureAuthenticatedMiddleware } from "~/infra/http/middlewares/ensure-authenticated.middleware";

import { ShowAuthenticatedUserController } from "../controllers/show-authenticated-user-controller";
import { AuthenticateUserController } from "../controllers/authenticate-user-controller";

import { validateCreateSession } from "../middlewares/validate-create-session";

const showAuthenticatedUserController = new ShowAuthenticatedUserController();
const authenticateUserController = new AuthenticateUserController();

const sessionRouter = Router();

sessionRouter.post(
  "/",
  validateCreateSession,
  authenticateUserController.handle
);
sessionRouter.post(
  "/me",
  ensureAuthenticatedMiddleware,
  showAuthenticatedUserController.handle
);

export { sessionRouter };
