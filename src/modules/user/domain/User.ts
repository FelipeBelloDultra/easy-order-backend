import * as zod from "zod";
import { randomUUID } from "node:crypto";
import { hash, compare } from "bcryptjs";

const userSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(5).max(255),
  password: zod.string().min(8).max(255),
  email: zod.string().max(255).email("Invalid email format"),
});

type UserProps = zod.infer<typeof userSchema>;

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;

  public get _id(): string {
    return this.id;
  }

  public get _name(): string {
    return this.name;
  }

  public get _email(): string {
    return this.email;
  }

  public get _password(): string {
    return this.password;
  }

  private constructor(
    { name, email, password }: Omit<UserProps, "id">,
    id?: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id || randomUUID();
  }

  public async comparePasswordHash(plainPassword: string): Promise<boolean> {
    const passwordIsEqual = await compare(plainPassword, this.password);

    return passwordIsEqual;
  }

  static async encodePassword(password: string): Promise<string> {
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
        throw new Error("Validation failed");
      }
    }
  }

  public static async create(user: UserProps): Promise<User> {
    this.validate(user);

    return new User(
      {
        name: user.name,
        email: user.email,
        password: user.id
          ? user.password
          : await this.encodePassword(user.password),
      },
      user.id
    );
  }
}
