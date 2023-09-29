import { container } from "tsyringe";
import { type Request, type Response } from "express";

import { AuthenticateUser } from "~/modules/user/application/use-cases/authenticate-user.use-case";
import { ShowAuthenticatedUser } from "~/modules/user/application/use-cases/show-authenticated-user.use-case";

export class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUser = container.resolve(AuthenticateUser);

    const result = await createUser.execute({
      email,
      password,
    });

    return res.json(result);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.user;

    const showAuthenticatedUser = container.resolve(ShowAuthenticatedUser);

    const result = await showAuthenticatedUser.execute({ email, id });

    return res.json(result);
  }
}
