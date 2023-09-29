import { inject, injectable } from "tsyringe";

import { UseCase } from "~/application/use-case/use-case";
import { HttpError } from "~/core/errors/http-error";

import { UserRepository } from "../repository/user-repository";
import { User } from "../../domain/User";

type Input = {
  name: string;
  email: string;
  password: string;
};
type Output = Promise<void>;

@injectable()
export class CreateUser implements UseCase<Input, Output> {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  public async execute(input: Input): Output {
    const user = await User.create({
      email: input.email,
      name: input.name,
      password: input.password,
    });

    const existingUser = await this.userRepository.findByEmail(user._email);

    if (existingUser) throw new HttpError("Email already exists", 400);

    await this.userRepository.create(user);
  }
}
