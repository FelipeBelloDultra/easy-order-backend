import { container } from "tsyringe";

import { UserRepository } from "../../application/repository/user-repository";
import { UserRepositoryDatabase } from "../repository/user-repository-database";

container.registerSingleton<UserRepository>(
  "UserRepository",
  UserRepositoryDatabase
);
