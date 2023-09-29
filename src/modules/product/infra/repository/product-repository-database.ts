import { ProductRepository } from "../../application/repository/product-repository";
import { Product } from "../../domain/product";

import { prismaClient } from "~/infra/database/prisma";

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

  public async findManyByUserId(userId: string): Promise<Product[]> {
    const products = await prismaClient.product.findMany({
      where: {
        user_id: userId,
      },
    });

    return products.map((product) =>
      Product.create(
        {
          name: product.name,
          price: product.price,
          userId: product.user_id,
          description: product.description || undefined,
        },
        product.id
      )
    );
  }
}
