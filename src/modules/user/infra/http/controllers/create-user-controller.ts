import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { CreateUser } from "~/modules/user/application/use-cases/create-user.use-case";
import { Controller } from "~/application/controller/controller";

export class CreateUserController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const createUser = container.resolve(CreateUser);

    const result = await createUser.execute({
      email,
      name,
      password,
    });

    return res.status(201).send();
  }
}
