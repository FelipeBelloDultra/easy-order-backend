import { OrderRepository } from "../../application/repository/order-repository";
import { Order } from "../../domain/order";
import { Pagination } from "~/core/domain/pagination";

import { prismaClient } from "~/infra/database/prisma";
import { PaginationRepository } from "~/application/repository/pagination-repository";
import {
  FindManyByUserIdQuery,
  FindOneById,
} from "../../application/query/order-query";

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
  ): Promise<Pagination<FindManyByUserIdQuery>> {
    const { skip, take } = pagination;

    const [total, orders] = await Promise.all([
      prismaClient.order.count({
        where: { user_id: userId },
      }),
      prismaClient.order.findMany({
        skip,
        take,
        orderBy: [
          {
            created_at: "desc",
          },
        ],
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
      }),
    ]);

    const data = orders.map((order) => ({
      id: order.id,
      client: {
        id: order.client.id,
        document: order.client.document,
        name: order.client.name,
      },
      products: order.products.map((product) => ({
        quantity: product.quantity,
        product: {
          id: product.product.id,
          name: product.product.name,
          description: product.product.description || undefined,
          price: product.product.price,
        },
      })),
    }));

    return Pagination.create({ result: data, total });
  }

  public async findOneById(
    orderId: string,
    userId: string
  ): Promise<FindOneById | undefined> {
    const order = await prismaClient.order.findUnique({
      where: {
        user_id: userId,
        id: orderId,
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

    if (!order) return undefined;

    const data = {
      id: order.id,
      client: {
        id: order.client.id,
        document: order.client.document,
        name: order.client.name,
      },
      products: order.products.map((product) => ({
        quantity: product.quantity,
        product: {
          id: product.product.id,
          name: product.product.name,
          description: product.product.description || undefined,
          price: product.product.price,
        },
      })),
    };

    return data;
  }
}
