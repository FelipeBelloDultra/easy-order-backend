import { PaginationRepository } from "~/application/repository/pagination-repository";
import { Pagination } from "~/core/domain/pagination";
import { Client } from "../../domain/client";
import { FindManyByUserIdQuery } from "../query/client-query";

export interface ClientRepository {
  create: (client: Client) => Promise<void>;
  findById: (id: string) => Promise<Client | undefined>;
  findManyByUserId: (
    userId: string,
    pagination: PaginationRepository
  ) => Promise<Pagination<FindManyByUserIdQuery>>;
}
