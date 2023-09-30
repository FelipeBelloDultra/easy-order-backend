import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { CreateOrder } from "~/modules/order/application/use-cases/create-order.use-case";
import { Controller } from "~/application/controller/controller";
import { controllerPresenter } from "~/application/presenter/controller-presenter";

export class CreateOrderController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { client, products } = req.body;

    const createOrder = container.resolve(CreateOrder);

    await createOrder.execute({
      userId: id,
      client,
      products,
    });

    return controllerPresenter(res).created();
  }
}
