import { getObjectMap, getMap } from "@src/maps"

// matchers marked with (*) come from the library `jest-extended`

describe("maps.test", () => {
  describe("plain object", () => {
    const map = getObjectMap()

    it("should have an item with key 'k1'", () => {
      expect(map).toHaveProperty("k1")
      expect(map).toContainKey("k1") // (*)
    })

    it("should have no item with key 'xxx'", () => {
      expect(map).not.toHaveProperty("xxx")
      expect(map).not.toContainKey("xxx") // (*)
    })

    it("should have an item with value 'v2'", () => {
      expect(Object.values(map)).toContain("v2")
      expect(map).toContainValue("v2") // (*)
    })

    it("should have no item with value 'yyy'", () => {
      expect(Object.values(map)).not.toContain("yyy")
      expect(map).not.toContainValue("yyy") // (*)
    })

    it("should have an item with key 'k2' and value 'v2'", () => {
      expect(map.k2).toBe("v2")
      expect(map).toHaveProperty("k2", "v2")
      // "is a superset of"
      expect(map).toMatchObject({ k2: "v2" })
      expect(map).toContainEntry(["k2", "v2"]) // (*)
    })
  })

  describe("Map", () => {
    const map = getMap()

    // the object matchers (toHaveProperty, toContainKey, ...) do NOT work for a `Map`
    // => use the API of `Map`: has, get, keys, values, size

    it("should have an item with key 'k1'", () => {
      expect(map.has("k1")).toBe(true)
      // better failure message: shows the keys
      expect([...map.keys()]).toContain("k1")
    })

    it("should have no item with key 'xxx'", () => {
      expect(map.has("xxx")).toBe(false)
      expect([...map.keys()]).not.toContain("xxx")
    })

    it("should have an item with value 'v2'", () => {
      expect([...map.values()]).toContain("v2")
    })

    it("should have no item with value 'yyy'", () => {
      expect([...map.values()]).not.toContain("yyy")
    })

    it("should have an item with key 'k2' and value 'v2'", () => {
      expect(map.get("k2")).toBe("v2")
      // a Map is a list of [key, value] pairs; toContainEqual compares them by value
      expect([...map]).toContainEqual(["k2", "v2"])
    })

    it("should be equal to another Map with the same items", () => {
      const expected = new Map([
        ["k1", "v1"],
        ["k2", "v2"],
      ])

      expect(map.size).toBe(2)
      // toEqual compares by value, toBe compares identity (===)
      expect(map).toEqual(expected)
      expect(map).not.toBe(expected)
    })
  })
})
