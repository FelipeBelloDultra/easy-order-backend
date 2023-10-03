import { inject, injectable } from "tsyringe";
import PDFDocument from "pdfkit";
import { type UseCase } from "~/application/use-case/use-case";

import { Product } from "~/modules/product/domain/product";
import { Client } from "~/modules/client/domain/client";
import { Order } from "../../domain/order";
import { OrderProduct } from "../../domain/order-product";

import { OrderRepository } from "../repository/order-repository";

import { OrderNotFound } from "./errors/order-not-found";

type Input = {
  orderId: string;
  userId: string;
  onFinish: () => void;
  onData: (data: Buffer) => void;
};
type Output = Promise<void>;

@injectable()
export class GenerateOrderPdf implements UseCase<Input, Output> {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: OrderRepository
  ) {}

  public async execute(input: Input): Output {
    const findedOrder = await this.orderRepository.findOneById(
      input.orderId,
      input.userId
    );

    if (!findedOrder) throw new OrderNotFound();

    const order = Order.create(
      {
        products: findedOrder.products.map((orderProduct) =>
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
            name: findedOrder.client.name,
            document: findedOrder.client.document,
            userId: input.userId,
          },
          findedOrder.client.id
        ),
      },
      findedOrder.id
    );
    const doc = new PDFDocument({ size: "a4" });

    doc.on("data", input.onData);
    doc.on("end", input.onFinish);

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
