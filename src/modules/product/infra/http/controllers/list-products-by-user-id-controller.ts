import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ListProductsByUserId } from "~/modules/product/application/use-cases/list-products-by-user-id.use-case";
import { Controller } from "~/application/controller/controller";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class ListProductsByUserIdController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { skip, take } = req.query;

    const listProductsByUserId = container.resolve(ListProductsByUserId);

    const result = await listProductsByUserId.execute({
      userId: id,
      pagination: {
        skip: Number(skip),
        take: Number(take),
      },
    });

    return controllerPresenter(res).ok(result);
  }
}
