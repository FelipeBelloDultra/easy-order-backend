import { container } from "tsyringe";

import { OrderRepository } from "../../application/repository/order-repository";
import { OrderRepositoryDatabase } from "../repository/order-repository-database";

container.registerSingleton<OrderRepository>(
  "OrderRepository",
  OrderRepositoryDatabase
);
