import { Router } from "express";

import { ensureAuthenticatedMiddleware } from "~/infra/http/middlewares/ensure-authenticated.middleware";
import { validateCreateProduct } from "../middlewares/validate-create-product.middleware";

import { ListProductsByUserIdController } from "../controllers/list-products-by-user-id-controller";
import { CreateProductController } from "../controllers/create-product-controller";

const listProductsByUserIdController = new ListProductsByUserIdController();
const createProductController = new CreateProductController();

const productRouter = Router();

productRouter.get(
  "/",
  ensureAuthenticatedMiddleware,
  listProductsByUserIdController.handle
);
productRouter.post(
  "/",
  ensureAuthenticatedMiddleware,
  validateCreateProduct,
  createProductController.handle
);

export { productRouter };
