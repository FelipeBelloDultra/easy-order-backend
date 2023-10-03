import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { GenerateOrderPdf } from "~/modules/order/application/use-cases/generate-order-pdf.use-case";
import { Controller } from "~/application/controller/controller";

export class GenerateOrderPdfController implements Controller {
  public async handle(req: Request, res: Response): Promise<void> {
    const { order_id } = req.params;
    const { id } = req.user;

    const generateOrderPdf = container.resolve(GenerateOrderPdf);

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment;filename=order-${order_id}-pdf.pdf`,
    });

    await generateOrderPdf.execute({
      orderId: order_id,
      userId: id,
      onData: (chunk) => stream.write(chunk),
      onFinish: () => stream.end(),
    });
  }
}
