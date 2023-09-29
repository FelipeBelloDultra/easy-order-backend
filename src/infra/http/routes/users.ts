import { Router } from "express";

import { validateCreateUser } from "~/modules/user/infra/http/middlewares/validate-create-user";
import { UserController } from "~/modules/user/infra/http/controllers/user-controller";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/", validateCreateUser, userController.create);

export { userRouter };
