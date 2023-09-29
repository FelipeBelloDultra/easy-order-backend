import { User } from "../../domain/user";

export interface UserRepository {
  create: (user: User) => Promise<void>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (id: string) => Promise<User | undefined>;
}
