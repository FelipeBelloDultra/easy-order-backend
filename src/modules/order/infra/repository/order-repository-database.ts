import { Client } from "~/modules/client/domain/client";
import { OrderRepository } from "../../application/repository/order-repository";
import { Order } from "../../domain/order";

import { prismaClient } from "~/infra/database/prisma";
import { Product } from "~/modules/product/domain/product";
import { OrderProduct } from "../../domain/order-product";

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

  public async findManyByUserId(userId: string): Promise<Order[]> {
    const orders = await prismaClient.order.findMany({
      where: {
        user_id: userId,
      },
      select: {
        client: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) =>
      Order.create({
        client: Client.create(
          {
            document: order.client.document,
            name: order.client.name,
            userId,
          },
          order.client.id
        ),
        userId,
        products: order.products.map((product) =>
          OrderProduct.create({
            product: Product.create(
              {
                name: product.product.name,
                price: product.product.price,
                description: product.product.description || undefined,
                userId,
              },
              product.product.id
            ),
            quantity: product.quantity,
          })
        ),
      })
    );
  }
}
