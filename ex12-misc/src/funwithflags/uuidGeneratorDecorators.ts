import { UuidGenerator } from "./uuidGenerator"

// Decorator pattern: a decorator IS a UuidGenerator and HAS a UuidGenerator.
// It delegates the work and adds its own functionality to the result.

export class UuidGeneratorUpperCaseDecoratorImpl implements UuidGenerator {
  constructor(private readonly delegate: UuidGenerator) {}

  create(): string {
    return this.delegate.create().toUpperCase()
  }
}

export class UuidGeneratorWithDashesDecoratorImpl implements UuidGenerator {
  constructor(private readonly delegate: UuidGenerator) {}

  create(): string {
    const uuid = this.delegate.create()
    return [
      uuid.slice(0, 8),
      uuid.slice(8, 12),
      uuid.slice(12, 16),
      uuid.slice(16, 20),
      uuid.slice(20),
    ].join("-")
  }
}
