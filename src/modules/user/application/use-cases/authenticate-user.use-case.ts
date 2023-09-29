import { inject, injectable } from "tsyringe";

import { UseCase } from "~/application/use-case/use-case";
import { Jwt } from "~/core/domain/jwt";

import { UserRepository } from "../repository/user-repository";
import { InvalidEmailPasswordCombination } from "./errors/invalid-email-password-combination";

type Input = {
  email: string;
  password: string;
};
type Output = Promise<Jwt>;

@injectable()
export class AuthenticateUser implements UseCase<Input, Output> {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  public async execute(input: Input): Output {
    const finded = await this.userRepository.findByEmail(input.email);

    if (!finded) {
      throw new InvalidEmailPasswordCombination();
    }

    const passwordIsEqual = await finded.comparePasswordHash(input.password);

    if (!passwordIsEqual) {
      throw new InvalidEmailPasswordCombination();
    }

    const jwt = Jwt.signIn({ id: finded._id, email: finded._email });

    return jwt;
  }
}
