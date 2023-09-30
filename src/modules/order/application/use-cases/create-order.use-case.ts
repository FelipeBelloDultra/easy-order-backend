import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";

import { OrderRepository } from "../repository/order-repository";
import { ClientRepository } from "~/modules/client/application/repository/client-repository";
import { ProductRepository } from "~/modules/product/application/repository/product-repository";

import { Client } from "~/modules/client/domain/client";
import { OrderProduct } from "../../domain/order-product";
import { Order } from "../../domain/order";

import { ClientOrderNotFound } from "./errors/client-order-not-found";
import { ProductOrderNotFound } from "./errors/product-order-not-found";

type Input = {
  userId: string;
  client: {
    id: string;
  };
  products: Array<{
    productId: string;
    quantity: number;
  }>;
};
type Output = Promise<void>;

@injectable()
export class CreateOrder implements UseCase<Input, Output> {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: OrderRepository,

    @inject("ClientRepository")
    private readonly clientRepository: ClientRepository,

    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  public async execute(input: Input): Output {
    const findedClient = await this.clientRepository.findById(input.client.id);

    if (!findedClient || findedClient._userId !== input.userId) {
      throw new ClientOrderNotFound();
    }

    const client = Client.create(
      {
        document: findedClient._document,
        name: findedClient._name,
        userId: findedClient._userId,
      },
      findedClient._id
    );

    const order = Order.create({
      client,
      userId: input.userId,
      products: [],
    });

    for (const product of input.products) {
      if (order.existsProductInOrderProduct(product.productId)) continue;

      const findedProduct = await this.productRepository.findById(
        product.productId
      );

      if (!findedProduct || findedProduct._userId !== input.userId) {
        throw new ProductOrderNotFound();
      }

      order.addProduct(
        OrderProduct.create({
          product: findedProduct,
          quantity: product.quantity,
        })
      );
    }

    await this.orderRepository.create(order);
  }
}
