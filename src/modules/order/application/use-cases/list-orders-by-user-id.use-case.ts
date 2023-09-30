import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";
import { PaginationRepository } from "~/application/repository/pagination-repository";

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
    private readonly orderRepository: OrderRepository
  ) {}
  public async execute(input: Input): Output {
    const orders = await this.orderRepository.findManyByUserId(input.userId, {
      skip: input.pagination.skip,
      take: input.pagination.take,
    });

    return orders;
  }
}
