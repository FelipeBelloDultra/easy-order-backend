import { inject, injectable } from "tsyringe";

import { UseCase } from "~/application/use-case/use-case";

import { UserRepository } from "../repository/user-repository";
import { User } from "../../domain/User";
import { UserNotFound } from "./errors/user-not-found";

type Input = {
  id: string;
  email: string;
};
type Output = Promise<User>;

@injectable()
export class ShowAuthenticatedUser implements UseCase<Input, Output> {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  public async execute(input: Input): Output {
    const user = await this.userRepository.findById(input.id);

    if (!user || user._email !== input.email) {
      throw new UserNotFound();
    }

    return user;
  }
}
