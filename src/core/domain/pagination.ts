type PaginationProps<T> = {
  total: number;
  result: T;
};

export class Pagination<T> {
  public readonly total: number;
  public readonly result: T;

  private constructor({ result, total }: PaginationProps<T>) {
    this.total = total;
    this.result = result;
  }

  public static create<T>({
    result,
    total,
  }: PaginationProps<T>): Pagination<T> {
    return new Pagination<T>({ result, total });
  }
}
