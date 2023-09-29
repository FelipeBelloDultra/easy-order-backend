import { randomUUID } from "node:crypto";

export abstract class Entity<T> {
  protected readonly id: string;
  protected readonly props: T;

  public get _id(): string {
    return this.id;
  }

  constructor(props: T, id?: string) {
    this.id = id || randomUUID();
    this.props = props;
  }
}
