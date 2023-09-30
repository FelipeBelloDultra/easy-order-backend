import { Entity } from "~/core/domain/entity";

import { Client } from "~/modules/client/domain/client";
import { OrderProduct } from "./order-product";

type OrderProps = {
  client: Client;
  userId: string;
  products: Array<OrderProduct>;
};

export class Order extends Entity<OrderProps> {
  public get _products(): Array<OrderProduct> {
    return this.props.products;
  }

  public get _client(): Client {
    return this.props.client;
  }

  public get _userId(): string {
    return this.props.userId;
  }

  private constructor({ client, userId, products }: OrderProps, id?: string) {
    super({ client, userId, products }, id);
  }

  public existsProductInOrderProduct(productId: string): boolean {
    return this.props.products.some((p) => p._product._id === productId);
  }

  public addProduct(product: OrderProduct): void {
    this.props.products.push(product);
  }

  public static create(order: OrderProps, id?: string): Order {
    return new Order(
      {
        client: order.client,
        userId: order.userId,
        products: order.products,
      },
      id
    );
  }
}
