import { Entity } from "~/core/domain/entity";
import { ValidationFailed } from "~/core/domain/errors/validation-failed";

import { Product } from "~/modules/product/domain/product";

type OrderProductProps = {
  quantity: number;
  product: Product;
};

export class OrderProduct extends Entity<OrderProductProps> {
  public get _product(): Product {
    return this.props.product;
  }

  public get _quantity(): number {
    return this.props.quantity;
  }

  private constructor({ product, quantity }: OrderProductProps, id?: string) {
    super({ product, quantity }, id);
  }

  private static validate(order: OrderProductProps) {
    if (order.quantity < 0) throw new ValidationFailed();
  }

  public static create(order: OrderProductProps, id?: string): OrderProduct {
    this.validate(order);

    return new OrderProduct(
      {
        product: order.product,
        quantity: order.quantity,
      },
      id
    );
  }

  public calculateOrderPrice(): number {
    return this._product.centsPriceToReal() * this._quantity;
  }

  public get getFormattedOrderPrice(): string {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.calculateOrderPrice());
  }
}
