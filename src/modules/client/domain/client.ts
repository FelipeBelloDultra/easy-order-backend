import * as zod from "zod";

import { Entity } from "~/core/domain/entity";
import { ValidationFailed } from "~/core/domain/errors/validation-failed";

const clientSchema = zod.object({
  name: zod.string().min(5).max(255),
  userId: zod.string(),
  document: zod
    .string()
    .regex(
      new RegExp(
        /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/
      ),
      "Invalid CPF/CNPJ format"
    ),
});

type ClientProps = zod.infer<typeof clientSchema>;

export class Client extends Entity<ClientProps> {
  public get _name(): string {
    return this.props.name;
  }

  public get _document(): string {
    return this.props.document;
  }

  public get _userId(): string {
    return this.props.userId;
  }

  private constructor({ document, name, userId }: ClientProps, id?: string) {
    super({ document, name, userId }, id);
  }

  private static validate(client: ClientProps) {
    const result = clientSchema.safeParse({
      name: client.name,
      document: client.document,
      userId: client.userId,
    });

    if (!result.success) {
      throw new ValidationFailed(result.error.flatten().fieldErrors);
    }
  }

  public static create(client: ClientProps, id?: string): Client {
    this.validate(client);

    return new Client(
      {
        name: client.name,
        document: client.document,
        userId: client.userId,
      },
      id
    );
  }
}
