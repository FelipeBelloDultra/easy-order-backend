import { Router } from "express";

import { userRouter } from "./users";
import { sessionRouter } from "./sessions";

const router = Router();

router.use("/users", userRouter);
router.use("/session", sessionRouter);

export { router };
