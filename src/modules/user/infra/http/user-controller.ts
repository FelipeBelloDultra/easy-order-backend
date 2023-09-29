import { type Request, type Response } from "express";

import { CreateUser } from "../../application/use-cases/create-user.use-case";
import { UserRepositoryDatabase } from "../repository/user-repository-database";

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const createUser = new CreateUser({
      userRepository: new UserRepositoryDatabase(),
    });

    const result = await createUser.execute({
      email,
      name,
      password,
    });

    return res.json(result);
  }
}
