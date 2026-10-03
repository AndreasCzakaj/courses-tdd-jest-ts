export interface Fibonacci {
  calculate(index: number): number
}

abstract class FibonacciImplBase implements Fibonacci {
  calculate(index: number): number {
    this.check(index)

    if (index < 2) {
      return index
    }

    return this.calculateInternal(index)
  }

  protected abstract calculateInternal(index: number): number

  private check(index: number) {
    if (index === undefined) {
      throw new Error("index must not be undefined")
    }
    if (index === null) {
      throw new Error("index must not be null")
    }
    if (index < 0) {
      throw new Error("index must not be negative")
    }
    if (index > 46) {
      throw new Error("index must not be > 46")
    }
  }
}

export class FibonacciLoopImpl extends FibonacciImplBase {
  protected calculateInternal(index: number): number {
    let previousPrevious = 0
    let previous = 1
    let result = 0
    for (let i = 2; i <= index; i++) {
      result = previous + previousPrevious
      previousPrevious = previous
      previous = result
    }
    return result
  }
}

export class FibonacciRecursionImpl extends FibonacciImplBase {
  protected calculateInternal(index: number): number {
    return this.calculate(index - 2) + this.calculate(index - 1)
  }
}
