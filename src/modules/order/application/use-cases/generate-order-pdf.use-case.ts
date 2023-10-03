import { inject, injectable } from "tsyringe";
import PDFDocument from "pdfkit";
import { type UseCase } from "~/application/use-case/use-case";

import { Product } from "~/modules/product/domain/product";
import { Client } from "~/modules/client/domain/client";
import { Order } from "../../domain/order";
import { OrderProduct } from "../../domain/order-product";

import { OrderRepository } from "../repository/order-repository";
import { PdfProvider } from "~/application/providers/pdf-provider";

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
    private readonly orderRepository: OrderRepository,

    @inject("PdfProvider")
    private readonly pdfProvider: PdfProvider
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

    this.pdfProvider.getDoc().on("data", input.onData);
    this.pdfProvider.getDoc().on("end", input.onFinish);

    this.pdfProvider.setMainTitle("Revisar pedido");

    this.pdfProvider.setOrderTitle(order.calculateTotalOrderPrice());

    this.pdfProvider.addOrderClient(order._client);
    this.pdfProvider.addOrderProduct(order._products);

    this.pdfProvider.end();
  }
}
