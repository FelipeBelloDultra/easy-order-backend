import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { CreateUser } from "~/modules/user/application/use-cases/create-user.use-case";

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const createUser = container.resolve(CreateUser);

    const result = await createUser.execute({
      email,
      name,
      password,
    });

    return res.json(result);
  }
}
