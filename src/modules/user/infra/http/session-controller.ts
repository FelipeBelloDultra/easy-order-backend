import { type Request, type Response } from "express";

import { AuthenticateUser } from "../../application/use-cases/authenticate-user.use-case";
import { ShowAuthenticatedUser } from "../../application/use-cases/show-authenticated-user.use-case";

import { UserRepositoryDatabase } from "../repository/user-repository-database";

export class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUser = new AuthenticateUser({
      userRepository: new UserRepositoryDatabase(),
    });

    const result = await createUser.execute({
      email,
      password,
    });

    return res.json(result);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.user;

    const showAuthenticatedUser = new ShowAuthenticatedUser({
      userRepository: new UserRepositoryDatabase(),
    });

    const result = await showAuthenticatedUser.execute({ email, id });

    return res.json(result);
  }
}
