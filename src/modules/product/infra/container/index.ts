import { container } from "tsyringe";

import { ProductRepository } from "../../application/repository/product-repository";
import { ProductRepositoryDatabase } from "../repository/product-repository-database";

container.registerSingleton<ProductRepository>(
  "ProductRepository",
  ProductRepositoryDatabase
);
