import { UseCase } from "~/application/use-case/use-case";
import { UserRepository } from "../repository/user-repository";
import { User } from "../../domain/User";

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
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) throw new Error("Email already exists");

    const user = await User.create({
      email: input.email,
      name: input.name,
      password: input.password,
    });

    await this.userRepository.create(user);
  }
}
