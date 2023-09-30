import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ListOrdersByUserId } from "~/modules/order/application/use-cases/list-orders-by-user-id.use-case";
import { Controller } from "~/application/controller/controller";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class ListOrdersByUserIdController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { skip, take } = req.query;

    const listOrdersByUserId = container.resolve(ListOrdersByUserId);

    const result = await listOrdersByUserId.execute({
      userId: id,
      pagination: {
        skip: Number(skip),
        take: Number(take),
      },
    });

    return controllerPresenter(res).ok(result);
  }
}
