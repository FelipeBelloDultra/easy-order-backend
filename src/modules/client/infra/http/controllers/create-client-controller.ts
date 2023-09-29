import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { CreateClient } from "~/modules/client/application/use-cases/create-client.use-case";
import { Controller } from "~/application/controller/controller";

export class CreateClientController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { name, document } = req.body;

    const createClient = container.resolve(CreateClient);

    await createClient.execute({
      userId: id,
      name,
      document,
    });

    return res.status(201).send();
  }
}
