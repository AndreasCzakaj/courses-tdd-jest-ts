import { randomInt } from "node:crypto"

export interface UuidGenerator {
  create(): string
}

export class UuidGeneratorNaiveRandomImpl implements UuidGenerator {
  create(): string {
    let uuid = ""
    for (let i = 0; i < 32; i++) {
      uuid += this.createOne()
    }
    return uuid
  }

  private createOne(): string {
    return randomInt(16).toString(16)
  }
}
