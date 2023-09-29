import * as zod from "zod";
import { hash, compare } from "bcryptjs";

import { Entity } from "~/core/domain/entity";

import { ValidationFailed } from "./errors/validation-failed";

const userSchema = zod.object({
  name: zod.string().min(5).max(255),
  password: zod.string().min(8).max(255),
  email: zod.string().max(255).email("Invalid email format"),
});

type UserProps = zod.infer<typeof userSchema>;

export class User extends Entity<UserProps> {
  public get _name(): string {
    return this.props.name;
  }

  public get _email(): string {
    return this.props.email;
  }

  public get _password(): string {
    return this.props.password;
  }

  private constructor({ name, email, password }: UserProps, id?: string) {
    super({ name, email, password }, id);
  }

  public async comparePasswordHash(plainPassword: string): Promise<boolean> {
    const passwordIsEqual = await compare(plainPassword, this.props.password);

    return passwordIsEqual;
  }

  private static async encodePassword(password: string): Promise<string> {
    const hashed = await hash(password, 8);

    return hashed;
  }

  private static validate(user: UserProps) {
    try {
      userSchema.parse({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      if (error instanceof zod.ZodError) {
        throw new ValidationFailed(error.errors);
      }
    }
  }

  public static async create(user: UserProps, id?: string): Promise<User> {
    this.validate(user);

    return new User(
      {
        name: user.name,
        email: user.email,
        password: id ? user.password : await this.encodePassword(user.password),
      },
      id
    );
  }
}
