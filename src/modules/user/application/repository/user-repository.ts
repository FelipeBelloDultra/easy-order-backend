import { User } from "../../domain/User";

export interface UserRepository {
  create: (user: User) => Promise<void>;
  findByEmail: (email: string) => Promise<User | undefined>;
}
