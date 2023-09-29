import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ShowAuthenticatedUser } from "~/modules/user/application/use-cases/show-authenticated-user.use-case";
import { Controller } from "~/application/controller/controller";

export class ShowAuthenticatedUserController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.user;

    const showAuthenticatedUser = container.resolve(ShowAuthenticatedUser);

    const result = await showAuthenticatedUser.execute({ email, id });

    return res.status(200).json(result);
  }
}
