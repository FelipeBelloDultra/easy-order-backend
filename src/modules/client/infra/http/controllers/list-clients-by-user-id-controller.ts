import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ListClientsByUserId } from "~/modules/client/application/use-cases/list-clients-by-user-id.use-case";
import { Controller } from "~/application/controller/controller";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class ListClientsByUserIdController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { skip, take } = req.query;

    const listClientsByUserId = container.resolve(ListClientsByUserId);

    const result = await listClientsByUserId.execute({
      userId: id,
      pagination: {
        skip: Number(skip),
        take: Number(take),
      },
    });

    return controllerPresenter(res).ok(result);
  }
}
