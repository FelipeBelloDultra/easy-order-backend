import { OrderRepository } from "../../application/repository/order-repository";
import { Client } from "~/modules/client/domain/client";
import { Order } from "../../domain/order";
import { Pagination } from "~/core/domain/pagination";
import { Product } from "~/modules/product/domain/product";

import { prismaClient } from "~/infra/database/prisma";
import { OrderProduct } from "../../domain/order-product";
import { PaginationRepository } from "~/application/repository/pagination-repository";

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

  public async findManyByUserId(
    userId: string,
    pagination: PaginationRepository
  ): Promise<Pagination<Order[]>> {
    const { skip, take } = pagination;

    const totalOrderByUserId = await prismaClient.order.count({
      where: { user_id: userId },
    });
    const orders = await prismaClient.order.findMany({
      skip,
      take,
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        client: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const data = orders.map((order) =>
      Order.create(
        {
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
            OrderProduct.create(
              {
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
              },
              product.order_id
            )
          ),
        },
        order.id
      )
    );

    return Pagination.create({ data, total: totalOrderByUserId });
  }
}
