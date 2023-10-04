import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";
import { CacheProvider } from "~/application/providers/cache-provider";

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
    private readonly productRepository: ProductRepository,

    @inject("CacheProvider")
    private readonly cacheProvider: CacheProvider
  ) {}

  public async execute(input: Input): Output {
    const product = Product.create({
      userId: input.userId,
      name: input.name,
      price: input.price,
      description: input.description,
    });

    await this.productRepository.create(product);

    await this.cacheProvider.invalidate(`${input.userId}:list-products:*`);

    return product._id;
  }
}
