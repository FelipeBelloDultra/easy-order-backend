import { inject, injectable } from "tsyringe";
import { type FindOneById } from "../query/order-query";
import { type UseCase } from "~/application/use-case/use-case";

import { type OrderRepository } from "../repository/order-repository";

import { OrderNotFound } from "./errors/order-not-found";

type Input = { userId: string; orderId: string };
type Output = Promise<FindOneById>;

@injectable()
export class FindOrderById implements UseCase<Input, Output> {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: OrderRepository
  ) {}

  public async execute(input: Input): Output {
    const findedOrder = await this.orderRepository.findOneById(
      input.orderId,
      input.userId
    );

    if (!findedOrder) throw new OrderNotFound();

    return findedOrder;
  }
}
