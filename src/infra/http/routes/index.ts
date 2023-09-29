import { Router } from "express";

import { productRouter } from "~/modules/product/infra/http/routes/products";
import { sessionRouter } from "~/modules/user/infra/http/routes/sessions";
import { clientRouter } from "~/modules/client/infra/http/routes/clients";
import { userRouter } from "~/modules/user/infra/http/routes/users";

const router = Router();

router.use("/users", userRouter);
router.use("/session", sessionRouter);
router.use("/products", productRouter);
router.use("/clients", clientRouter);

export { router };
