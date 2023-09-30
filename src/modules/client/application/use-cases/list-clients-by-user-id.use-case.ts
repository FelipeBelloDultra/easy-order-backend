import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";
import { PaginationRepository } from "~/application/repository/pagination-repository";

import { ClientRepository } from "../repository/client-repository";
import { Pagination } from "~/core/domain/pagination";
import { FindManyByUserIdQuery } from "../query/client-query";

type Input = {
  userId: string;
  pagination: PaginationRepository;
};
type Output = Promise<Pagination<FindManyByUserIdQuery>>;

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
