import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { CreateProduct } from "~/modules/product/application/use-cases/create-product.use-case";
import { Controller } from "~/application/controller/controller";

export class CreateProductController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { name, price, description } = req.body;

    const createProduct = container.resolve(CreateProduct);

    await createProduct.execute({
      userId: id,
      name,
      price,
      description,
    });

    return res.status(201).send();
  }
}
