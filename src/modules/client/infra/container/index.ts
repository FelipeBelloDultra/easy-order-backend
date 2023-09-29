import { container } from "tsyringe";

import { ClientRepository } from "../../application/repository/client-repository";
import { ClientRepositoryDatabase } from "../repository/client-repository-database";

container.registerSingleton<ClientRepository>(
  "ClientRepository",
  ClientRepositoryDatabase
);
