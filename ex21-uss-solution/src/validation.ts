export class ValidationError extends Error {
  constructor(fields: string[]) {
    super(JSON.stringify(fields))
  }
}
