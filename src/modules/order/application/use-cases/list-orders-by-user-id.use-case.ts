import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";
import { PaginationRepository } from "~/application/repository/pagination-repository";
import { CacheProvider } from "~/application/providers/cache-provider";

import { OrderRepository } from "../repository/order-repository";
import { Pagination } from "~/core/domain/pagination";
import { FindManyByUserIdQuery } from "../query/order-query";

type Input = {
  userId: string;
  pagination: PaginationRepository;
};
type Output = Promise<Pagination<FindManyByUserIdQuery>>;

@injectable()
export class ListOrdersByUserId implements UseCase<Input, Output> {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: OrderRepository,

    @inject("CacheProvider")
    private readonly cacheProvider: CacheProvider
  ) {}
  public async execute(input: Input): Output {
    let orders = await this.cacheProvider.getByKey<Output>(
      `${input.userId}:list-orders:skip-${input.pagination.skip}:take-${input.pagination.take}`
    );

    if (!orders) {
      orders = await this.orderRepository.findManyByUserId(input.userId, {
        skip: input.pagination.skip,
        take: input.pagination.take,
      });

      await this.cacheProvider.save(`${input.userId}:list-orders`, orders);
    }

    return orders;
  }
}
