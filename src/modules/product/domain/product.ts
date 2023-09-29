import * as zod from "zod";

import { Entity } from "~/core/domain/entity";

import { ValidationFailed } from "./errors/validation-failed";

const productSchema = zod.object({
  name: zod.string().min(5).max(255),
  description: zod.string().min(5).max(255).optional(),
  price: zod.number(),
});

type ProductProps = zod.infer<typeof productSchema>;

export class Product extends Entity<ProductProps> {
  public get _name(): string {
    return this.props.name;
  }

  public get _price(): number {
    return this.props.price;
  }

  public get _description(): string | undefined {
    return this.props.description;
  }

  private constructor({ description, name, price }: ProductProps, id?: string) {
    super({ name, price, description }, id);
  }

  private static realToCents(value: number): number {
    return value * 100;
  }

  private static validate(product: ProductProps) {
    try {
      productSchema.parse({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    } catch (error) {
      if (error instanceof zod.ZodError) {
        throw new ValidationFailed(error.errors);
      }
    }
  }

  public static create(product: ProductProps, id?: string): Product {
    this.validate(product);

    return new Product(
      {
        name: product.name,
        description: product.description,
        price: id ? product.price : this.realToCents(product.price),
      },
      id
    );
  }
}
