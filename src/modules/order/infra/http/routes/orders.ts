import { Router } from "express";

import { ensureAuthenticatedMiddleware } from "~/infra/http/middlewares/ensure-authenticated.middleware";
import { validateCreateOrder } from "../middlewares/validate-create-order";

import { CreateOrderController } from "../controllers/create-order-controller";

const createOrderController = new CreateOrderController();

const orderRouter = Router();

orderRouter.post(
  "/",
  ensureAuthenticatedMiddleware,
  validateCreateOrder,
  createOrderController.handle
);

export { orderRouter };
