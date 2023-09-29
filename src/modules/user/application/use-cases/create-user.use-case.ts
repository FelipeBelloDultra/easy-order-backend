import { inject, injectable } from "tsyringe";

import { UseCase } from "~/application/use-case/use-case";

import { UserRepository } from "../repository/user-repository";
import { User } from "../../domain/user";
import { EmailAlreadyExists } from "./errors/email-already-exists";

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

    if (existingUser) throw new EmailAlreadyExists();

    await this.userRepository.create(user);
  }
}
