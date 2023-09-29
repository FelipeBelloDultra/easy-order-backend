import { UserRepository } from "../../application/repository/user-repository";
import { User } from "../../domain/user";

import { prismaClient } from "~/infra/database/prisma";

export class UserRepositoryDatabase implements UserRepository {
  public async create(user: User): Promise<void> {
    await prismaClient.user.create({
      data: {
        id: user._id,
        email: user._email,
        name: user._name,
        password: user._password,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) return undefined;

    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      user.id
    );
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) return undefined;

    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      user.id
    );
  }
}
