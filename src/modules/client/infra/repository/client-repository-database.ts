import { ClientRepository } from "../../application/repository/client-repository";
import { Client } from "../../domain/client";

import { prismaClient } from "~/infra/database/prisma";

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

  public async findManyByUserId(userId: string): Promise<Client[]> {
    const clients = await prismaClient.client.findMany({
      where: {
        user_id: userId,
      },
    });

    return clients.map((client) =>
      Client.create(
        {
          name: client.name,
          document: client.document,
          userId: client.user_id,
        },
        client.id
      )
    );
  }
}
