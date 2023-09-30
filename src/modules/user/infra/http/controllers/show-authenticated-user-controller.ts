import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ShowAuthenticatedUser } from "~/modules/user/application/use-cases/show-authenticated-user.use-case";
import { Controller } from "~/application/controller/controller";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class ShowAuthenticatedUserController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.user;

    const showAuthenticatedUser = container.resolve(ShowAuthenticatedUser);

    const result = await showAuthenticatedUser.execute({ email, id });

    return controllerPresenter(res).ok(result);
  }
}
