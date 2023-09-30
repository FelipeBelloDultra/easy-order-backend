import { PaginationRepository } from "~/application/repository/pagination-repository";
import { Product } from "../../domain/product";

export interface ProductRepository {
  create: (product: Product) => Promise<void>;
  findById: (id: string) => Promise<Product | undefined>;
  findManyByUserId: (
    userId: string,
    pagination: PaginationRepository
  ) => Promise<Array<Product>>;
}
