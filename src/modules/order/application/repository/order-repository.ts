import { Order } from "../../domain/order";

export interface OrderRepository {
  create: (order: Order) => Promise<void>;
  findManyByUserId: (userId: string) => Promise<Array<Order>>;
}
