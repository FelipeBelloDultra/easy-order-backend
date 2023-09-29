import { Router } from "express";

import { ensureAuthenticatedMiddleware } from "~/infra/http/middlewares/ensure-authenticated.middleware";

import { ListProductsByUserIdController } from "../controllers/list-products-by-user-id-controller";

const listProductsByUserIdController = new ListProductsByUserIdController();

const productRouter = Router();

productRouter.get(
  "/",
  ensureAuthenticatedMiddleware,
  listProductsByUserIdController.handle
);

export { productRouter };
