import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";

import { OrderRepository } from "../repository/order-repository";
import { Order } from "../../domain/order";

type Input = {
  userId: string;
};
type Output = Promise<Array<Order>>;

@injectable()
export class ListOrdersByUserId implements UseCase<Input, Output> {
  constructor(
    @inject("OrderRepository")
    private readonly orderRepository: OrderRepository
  ) {}
  public async execute(input: Input): Output {
    const orders = await this.orderRepository.findManyByUserId(input.userId);

    return orders;
  }
}
