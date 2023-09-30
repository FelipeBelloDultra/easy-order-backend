import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { CreateUser } from "~/modules/user/application/use-cases/create-user.use-case";
import { Controller } from "~/application/controller/controller";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class CreateUserController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const createUser = container.resolve(CreateUser);

    await createUser.execute({
      email,
      name,
      password,
    });

    return controllerPresenter(res).created();
  }
}
