import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";
import { PaginationRepository } from "~/application/repository/pagination-repository";

import { Client } from "../../domain/client";
import { ClientRepository } from "../repository/client-repository";

type Input = {
  userId: string;
  pagination: PaginationRepository;
};
type Output = Promise<Array<Client>>;

@injectable()
export class ListClientsByUserId implements UseCase<Input, Output> {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: ClientRepository
  ) {}

  public async execute(input: Input): Output {
    const clients = await this.clientRepository.findManyByUserId(input.userId, {
      skip: input.pagination.skip,
      take: input.pagination.take,
    });

    return clients;
  }
}
