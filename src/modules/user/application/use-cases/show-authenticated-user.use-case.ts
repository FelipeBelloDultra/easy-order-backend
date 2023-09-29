import { inject, injectable } from "tsyringe";

import { HttpError } from "~/core/errors/http-error";
import { UseCase } from "~/application/use-case/use-case";

import { UserRepository } from "../repository/user-repository";
import { User } from "../../domain/User";

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

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    if (user._email !== input.email) {
      throw new HttpError("Invalid email", 401);
    }

    return user;
  }
}
