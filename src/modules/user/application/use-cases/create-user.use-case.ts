import { UseCase } from "~/application/use-case/use-case";
import { UserRepository } from "../repository/user-repository";
import { User } from "../../domain/User";
import { HttpError } from "~/core/errors/http-error";

type Input = {
  name: string;
  email: string;
  password: string;
};
type Output = Promise<void>;
type CreateUserProps = {
  userRepository: UserRepository;
};

export class CreateUser implements UseCase<Input, Output> {
  private readonly userRepository: UserRepository;

  constructor({ userRepository }: CreateUserProps) {
    this.userRepository = userRepository;
  }

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
