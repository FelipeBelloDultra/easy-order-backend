import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";

import { ProductRepository } from "../repository/product-repository";
import { PaginationRepository } from "~/application/repository/pagination-repository";
import { Pagination } from "~/core/domain/pagination";
import { FindManyByUserIdQuery } from "../query/product-query";

type Input = {
  userId: string;
  pagination: PaginationRepository;
};
type Output = Promise<Pagination<FindManyByUserIdQuery>>;

@injectable()
export class ListProductsByUserId implements UseCase<Input, Output> {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  public async execute(input: Input): Output {
    const products = await this.productRepository.findManyByUserId(
      input.userId,
      {
        skip: input.pagination.skip,
        take: input.pagination.take,
      }
    );

    return products;
  }
}
