import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { ListClientsByUserId } from "~/modules/client/application/use-cases/list-clients-by-user-id.use-case";
import { Controller } from "~/application/controller/controller";

export class ListClientsByUserIdController implements Controller {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listClientsByUserId = container.resolve(ListClientsByUserId);

    const result = await listClientsByUserId.execute({ userId: id });

    return res.status(200).json(result);
  }
}
