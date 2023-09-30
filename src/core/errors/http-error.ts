export type HttpErrors = { [key: string]: Array<string> };

export class HttpError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly errors: HttpErrors = {}
  ) {}
}
