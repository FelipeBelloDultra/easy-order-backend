import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUser } from "~/modules/user/application/use-cases/authenticate-user.use-case";
import { Controller } from "~/application/controller/controller";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class AuthenticateUserController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateUser = container.resolve(AuthenticateUser);

    const result = await authenticateUser.execute({ email, password });

    return controllerPresenter(res).ok(result);
  }
}
