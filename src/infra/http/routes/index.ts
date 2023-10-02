import { Router } from "express";

import { productRouter } from "~/modules/product/infra/http/routes/products";
import { sessionRouter } from "~/modules/user/infra/http/routes/sessions";
import { clientRouter } from "~/modules/client/infra/http/routes/clients";
import { userRouter } from "~/modules/user/infra/http/routes/users";
import { orderRouter } from "~/modules/order/infra/http/routes/orders";

import { requestRateLimiter } from "../middlewares/rate-limit.middleware";

const router = Router();

router.use(requestRateLimiter());

router.use("/users", userRouter);
router.use("/session", sessionRouter);
router.use("/products", productRouter);
router.use("/clients", clientRouter);
router.use("/orders", orderRouter);

export { router };
