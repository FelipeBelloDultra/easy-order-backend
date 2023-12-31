import { ProductRepository } from "../../application/repository/product-repository";
import { Product } from "../../domain/product";
import { Pagination } from "~/core/domain/pagination";

import { prismaClient } from "~/infra/database/prisma";
import { PaginationRepository } from "~/application/repository/pagination-repository";
import { FindManyByUserIdQuery } from "../../application/query/product-query";

export class ProductRepositoryDatabase implements ProductRepository {
  public async create(product: Product): Promise<void> {
    await prismaClient.product.create({
      data: {
        name: product._name,
        user_id: product._userId,
        id: product._id,
        price: product._price,
        description: product._description,
      },
    });
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await prismaClient.product.findUnique({ where: { id } });

    if (!product) return undefined;

    return Product.create(
      {
        name: product.name,
        price: product.price,
        description: product.description || undefined,
        userId: product.user_id,
      },
      product.id
    );
  }

  public async findManyByUserId(
    userId: string,
    pagination: PaginationRepository
  ): Promise<Pagination<FindManyByUserIdQuery>> {
    const { skip, take } = pagination;

    const [total, products] = await Promise.all([
      prismaClient.product.count({
        where: {
          user_id: userId,
        },
      }),
      prismaClient.product.findMany({
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
      }),
    ]);

    const data = products.map((product) => ({
      id: product.id,
      price: product.price,
      description: product.description || undefined,
      name: product.name,
    }));

    return Pagination.create({
      result: data,
      total,
    });
  }
}
