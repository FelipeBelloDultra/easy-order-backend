import { Router } from "express";

import { ensureAuthenticatedMiddleware } from "~/infra/http/middlewares/ensure-authenticated.middleware";
import { validateCreateClient } from "../middlewares/validate-create-client.middleware";

import { ListClientsByUserIdController } from "../controllers/list-clients-by-user-id-controller";
import { CreateClientController } from "../controllers/create-client-controller";

const listClientsByUserIdController = new ListClientsByUserIdController();
const createClientController = new CreateClientController();

const clientRouter = Router();

clientRouter.get(
  "/",
  ensureAuthenticatedMiddleware,
  listClientsByUserIdController.handle
);
clientRouter.post(
  "/",
  ensureAuthenticatedMiddleware,
  validateCreateClient,
  createClientController.handle
);

export { clientRouter };
