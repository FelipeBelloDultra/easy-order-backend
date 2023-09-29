import { Product } from "../../domain/product";

export interface ProductRepository {
  create: (product: Product) => Promise<void>;
  findById: (id: string) => Promise<Product | undefined>;
  findManyByUserId: (userId: string) => Promise<Array<Product>>;
}
