import { Router } from "express";

import { CreateUserController } from "../controllers/create-user-controller";
import { validateCreateUser } from "../middlewares/validate-create-user.middleware";

const createUserController = new CreateUserController();

const userRouter = Router();

userRouter.post("/", validateCreateUser, createUserController.handle);

export { userRouter };
