import { inject, injectable } from "tsyringe";
import { UseCase } from "~/application/use-case/use-case";

import { ClientRepository } from "../repository/client-repository";
import { Client } from "../../domain/client";

type Input = {
  userId: string;
  name: string;
  document: string;
};
type Output = Promise<string>;

@injectable()
export class CreateClient implements UseCase<Input, Output> {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: ClientRepository
  ) {}

  public async execute(input: Input): Output {
    const client = Client.create({
      userId: input.userId,
      name: input.name,
      document: input.document,
    });

    await this.clientRepository.create(client);

    return client._id;
  }
}
