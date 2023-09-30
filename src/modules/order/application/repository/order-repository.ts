import { PaginationRepository } from "~/application/repository/pagination-repository";
import { Order } from "../../domain/order";

export interface OrderRepository {
  create: (order: Order) => Promise<void>;
  findManyByUserId: (
    userId: string,
    pagination: PaginationRepository
  ) => Promise<Array<Order>>;
}
