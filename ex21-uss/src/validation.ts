export class ValidationError extends Error {
  constructor(fields: Record<string, string>) {
    super(JSON.stringify(fields))
  }
}
