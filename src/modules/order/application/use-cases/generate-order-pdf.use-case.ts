import PDFDocument from "pdfkit";
import { type CallbackUseCase } from "~/application/use-case/use-case";

import { FindOneById } from "../query/order-query";

import { Order } from "../../domain/order";
import { Client } from "~/modules/client/domain/client";
import { OrderProduct } from "../../domain/order-product";
import { Product } from "~/modules/product/domain/product";

type Input = { order: FindOneById; userId: string };
type OnData = (chunk: Buffer) => void;
type OnFinish = () => void;
type Output = void;

export class GenerateOrderPdf implements CallbackUseCase<Input, Output> {
  public execute(input: Input, onData: OnData, onFinish: OnFinish): Output {
    const order = Order.create(
      {
        products: input.order.products.map((orderProduct) =>
          OrderProduct.create({
            quantity: orderProduct.quantity,
            product: Product.create(
              {
                name: orderProduct.product.name,
                price: orderProduct.product.price,
                description: orderProduct.product.description,
                userId: input.userId,
              },
              orderProduct.product.id
            ),
          })
        ),
        userId: input.userId,
        client: Client.create(
          {
            name: input.order.client.name,
            document: input.order.client.document,
            userId: input.userId,
          },
          input.order.client.id
        ),
      },
      input.order.id
    );

    const doc = new PDFDocument({ size: "a4" }); //(595.28 x 841.89)

    doc.on("data", onData);
    doc.on("end", onFinish);

    doc.fontSize(22).text("Revisar pedido", { align: "center" }).moveDown();

    doc
      .fontSize(18)
      .text(`Valor do pedido: ${order.calculateTotalOrderPrice()}`)
      .moveDown();

    doc.fontSize(16).text("Cliente:").moveDown();

    doc
      .fontSize(12)
      .text(`Nome: ${order._client._name}`)
      .text(`Documento: ${order._client._document}`)
      .moveDown();

    doc.fontSize(16).text("Produtos:").moveDown();

    order._products.forEach((product) => {
      doc
        .fontSize(12)
        .text(`Nome do produto: ${product._product._name}`)
        .text(`Quantidade no pedido: ${product._quantity}`)
        .text(`Valor unitario: $${product._product.getFormattedProductPrice}`)
        .text(
          `Valor total (unitario x quantidade): ${product.getFormattedOrderPrice}`
        )
        .moveDown();
    });

    doc.end();
  }
}
