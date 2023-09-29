import { UserRepository } from "../../application/repository/user-repository";
import { User } from "../../domain/User";

import { DatabaseConnection } from "~/infra/database/database-connection";

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly dabaseConnection: DatabaseConnection) {}

  public async create(user: User): Promise<void> {
    await this.dabaseConnection.query().user.create({
      data: {
        id: user._id,
        email: user._email,
        name: user._name,
        password: user._password,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.dabaseConnection
      .query()
      .user.findUnique({ where: { email } });

    if (!user) return undefined;

    return User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
