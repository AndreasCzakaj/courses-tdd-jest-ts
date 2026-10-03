// JavaScript has 2 kinds of "maps":

// 1. a plain object, used as a dictionary
export function getObjectMap(): Record<string, string> {
  return { k1: "v1", k2: "v2" }
}

// 2. a `Map`
export function getMap(): Map<string, string> {
  return new Map([
    ["k1", "v1"],
    ["k2", "v2"],
  ])
}
