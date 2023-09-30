type PaginationProps<T> = {
  total: number;
  data: T;
};

export class Pagination<T> {
  public readonly total: number;
  public readonly data: T;

  private constructor({ data, total }: PaginationProps<T>) {
    this.total = total;
    this.data = data;
  }

  public static create<T>({ data, total }: PaginationProps<T>): Pagination<T> {
    return new Pagination<T>({ data, total });
  }
}
