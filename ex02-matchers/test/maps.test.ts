import { getObjectMap, getMap } from "@src/maps"

describe("maps.test", () => {
  describe("plain object", () => {
    const map = getObjectMap()

    it.todo("should have an item with key 'k1'")
    it.todo("should have no item with key 'xxx'")
    it.todo("should have an item with value 'v2'")
    it.todo("should have no item with value 'yyy'")
    it.todo("should have an item with key 'k2' and value 'v2'")
  })

  describe("Map", () => {
    const map = getMap()

    it.todo("should have an item with key 'k1'")
    it.todo("should have no item with key 'xxx'")
    it.todo("should have an item with value 'v2'")
    it.todo("should have no item with value 'yyy'")
    it.todo("should have an item with key 'k2' and value 'v2'")
    it.todo("should be equal to another Map with the same items")
  })
})
