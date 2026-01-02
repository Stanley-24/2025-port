export class ValidationError extends Error {
  constructor(
    public message: string,
    public errors: Record<string, string | undefined>,
    public status: number = 400
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}