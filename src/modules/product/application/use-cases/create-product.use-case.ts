import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";

import { ProductRepository } from "../repository/product-repository";
import { Product } from "../../domain/product";

type Input = {
  userId: string;
  name: string;
  price: number;
  description?: string;
};
type Output = Promise<string>;

@injectable()
export class CreateProduct implements UseCase<Input, Output> {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  public async execute(input: Input): Output {
    const product = Product.create({
      userId: input.userId,
      name: input.name,
      price: input.price,
      description: input.description,
    });

    await this.productRepository.create(product);

    return product._id;
  }
}
