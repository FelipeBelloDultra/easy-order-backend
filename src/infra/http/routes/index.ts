import { Router } from "express";

import { sessionRouter } from "~/modules/user/infra/http/routes/sessions";
import { userRouter } from "~/modules/user/infra/http/routes/users";

const router = Router();

router.use("/users", userRouter);
router.use("/session", sessionRouter);

export { router };
