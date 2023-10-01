import { Router } from "express";

import { ensureAuthenticatedMiddleware } from "~/infra/http/middlewares/ensure-authenticated.middleware";
import { validateCreateOrder } from "../middlewares/validate-create-order.middleware";

import { CreateOrderController } from "../controllers/create-order-controller";
import { ListOrdersByUserIdController } from "../controllers/list-orders-by-user-id-controller";
import { GenerateOrderPdfController } from "../controllers/generate-order-pdf.controller";
import { pagination } from "~/infra/http/middlewares/pagination.middleware";

const createOrderController = new CreateOrderController();
const listOrdersByUserIdController = new ListOrdersByUserIdController();
const generateOrderPdfController = new GenerateOrderPdfController();

const orderRouter = Router();

orderRouter.post(
  "/",
  ensureAuthenticatedMiddleware,
  validateCreateOrder,
  createOrderController.handle
);
orderRouter.get(
  "/",
  ensureAuthenticatedMiddleware,
  pagination,
  listOrdersByUserIdController.handle
);
orderRouter.get(
  "/:order_id/pdf",
  ensureAuthenticatedMiddleware,
  generateOrderPdfController.handle
);

export { orderRouter };
