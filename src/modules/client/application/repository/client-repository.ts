import { PaginationRepository } from "~/application/repository/pagination-repository";
import { Client } from "../../domain/client";

export interface ClientRepository {
  create: (client: Client) => Promise<void>;
  findById: (id: string) => Promise<Client | undefined>;
  findManyByUserId: (
    userId: string,
    pagination: PaginationRepository
  ) => Promise<Array<Client>>;
}
