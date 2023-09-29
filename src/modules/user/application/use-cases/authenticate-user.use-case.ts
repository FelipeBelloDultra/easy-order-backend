import { UseCase } from "~/application/use-case/use-case";
import { Jwt } from "~/core/domain/jwt";
import { UserRepository } from "../repository/user-repository";
import { HttpError } from "~/core/errors/http-error";

type Input = {
  email: string;
  password: string;
};
type Output = Promise<Jwt>;
type AuthenticateUserProps = {
  userRepository: UserRepository;
};

export class AuthenticateUser implements UseCase<Input, Output> {
  private readonly userRepository: UserRepository;

  constructor({ userRepository }: AuthenticateUserProps) {
    this.userRepository = userRepository;
  }

  public async execute(input: Input): Output {
    const finded = await this.userRepository.findByEmail(input.email);

    if (!finded) {
      throw new HttpError("Invalid email/password combination", 401);
    }

    const passwordIsEqual = await finded.comparePasswordHash(input.password);

    if (!passwordIsEqual) {
      throw new HttpError("Invalid email/password combination", 401);
    }

    const jwt = Jwt.signIn({ id: finded._id, email: finded._email });

    return jwt;
  }
}
