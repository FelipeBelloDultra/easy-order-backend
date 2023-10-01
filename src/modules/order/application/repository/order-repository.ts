import { PaginationRepository } from "~/application/repository/pagination-repository";
import { Pagination } from "~/core/domain/pagination";
import { Order } from "../../domain/order";
import { FindManyByUserIdQuery, FindOneById } from "../query/order-query";

export interface OrderRepository {
  create: (order: Order) => Promise<void>;
  findManyByUserId: (
    userId: string,
    pagination: PaginationRepository
  ) => Promise<Pagination<FindManyByUserIdQuery>>;
  findOneById: (
    orderId: string,
    userId: string
  ) => Promise<FindOneById | undefined>;
}
