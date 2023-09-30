import { OrderRepository } from "../../application/repository/order-repository";
import { Order } from "../../domain/order";

import { prismaClient } from "~/infra/database/prisma";

export class OrderRepositoryDatabase implements OrderRepository {
  public async create(order: Order): Promise<void> {
    await prismaClient.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          user_id: order._userId,
          id: order._id,
          client_id: order._client._id,
        },
      });

      for (const orderProduct of order._products) {
        await tx.productOrder.create({
          data: {
            order_id: order._id,
            product_id: orderProduct._product._id,
            quantity: orderProduct._quantity,
          },
        });
      }
    });
  }
}
