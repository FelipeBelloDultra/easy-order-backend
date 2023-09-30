import { PaginationRepository } from "~/application/repository/pagination-repository";
import { Pagination } from "~/core/domain/pagination";
import { Product } from "../../domain/product";
import { FindManyByUserIdQuery } from "../query/product-query";

export interface ProductRepository {
  create: (product: Product) => Promise<void>;
  findById: (id: string) => Promise<Product | undefined>;
  findManyByUserId: (
    userId: string,
    pagination: PaginationRepository
  ) => Promise<Pagination<FindManyByUserIdQuery>>;
}
