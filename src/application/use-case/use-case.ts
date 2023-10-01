export interface UseCase<Input, Output> {
  execute: (input: Input) => Output;
}

export interface CallbackUseCase<Input, Output> {
  execute: (
    input: Input,
    onData: (chunk: Buffer) => void,
    onFinish: () => void
  ) => Output;
}
