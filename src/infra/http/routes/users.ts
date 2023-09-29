import { Router } from "express";

import { UserController } from "~/modules/user/infra/http/user-controller";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/", userController.create);

export { userRouter };
