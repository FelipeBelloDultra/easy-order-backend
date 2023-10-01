import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { GenerateOrderPdf } from "~/modules/order/application/use-cases/generate-order-pdf.use-case";
import { FindOrderById } from "~/modules/order/application/use-cases/find-order-by-id.use-case";
import { Controller } from "~/application/controller/controller";

export class GenerateOrderPdfController implements Controller {
  public async handle(req: Request, res: Response): Promise<void> {
    const { order_id } = req.params;
    const { id } = req.user;

    const findOrderById = container.resolve(FindOrderById);
    const order = await findOrderById.execute({
      orderId: order_id,
      userId: id,
    });

    const generateOrderPdf = new GenerateOrderPdf();

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment;filename=order-${order.id}-pdf.pdf`,
    });

    generateOrderPdf.execute(
      {
        order,
        userId: id,
      },
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  }
}
