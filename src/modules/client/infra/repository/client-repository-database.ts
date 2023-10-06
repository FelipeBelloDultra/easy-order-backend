import { ClientRepository } from "../../application/repository/client-repository";
import { Client } from "../../domain/client";
import { Pagination } from "~/core/domain/pagination";

import { prismaClient } from "~/infra/database/prisma";
import { PaginationRepository } from "~/application/repository/pagination-repository";
import { FindManyByUserIdQuery } from "../../application/query/client-query";

export class ClientRepositoryDatabase implements ClientRepository {
  public async create(client: Client): Promise<void> {
    await prismaClient.client.create({
      data: {
        id: client._id,
        name: client._name,
        document: client._document,
        user_id: client._userId,
      },
    });
  }

  public async findById(id: string): Promise<Client | undefined> {
    const client = await prismaClient.client.findUnique({ where: { id } });

    if (!client) return undefined;

    return Client.create(
      {
        name: client.name,
        document: client.document,
        userId: client.user_id,
      },
      client.id
    );
  }

  public async findManyByUserId(
    userId: string,
    pagination: PaginationRepository
  ): Promise<Pagination<FindManyByUserIdQuery>> {
    const { skip, take } = pagination;

    const [total, clients] = await Promise.all([
      prismaClient.client.count({
        where: { user_id: userId },
      }),
      prismaClient.client.findMany({
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

    const data = clients.map((client) => ({
      id: client.id,
      name: client.name,
      document: client.document,
    }));

    return Pagination.create({
      result: data,
      total,
    });
  }
}
