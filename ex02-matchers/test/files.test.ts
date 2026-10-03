import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const pplJson = fileURLToPath(new URL("../src/ppl.json", import.meta.url))

describe("files.test", () => {
  let tmpDir: string
  let newFile: string

  // Vitest has no built-in temp dir => create a fresh one per test ...
  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tdd-"))
    expect(statSync(tmpDir).isDirectory()).toBe(true)

    newFile = join(tmpDir, "newFile.txt")
    expect(existsSync(newFile)).toBe(false)

    writeFileSync(newFile, "The first line\nThe second line\n", "utf8")
  })

  // ... and clean it up afterwards
  afterEach(() => {
    rmSync(tmpDir, { recursive: true })
  })

  // "The first line"
  // "The second line"
  it.todo("newFile should exist and contain the first and second line")

  it.todo("some other file in the same folder should not exist")

  it.todo(
    "newFile should match the file `expected/newFile.txt` (tip: `toMatchFileSnapshot`)"
  )

  test("json file", () => {
    expect(existsSync(pplJson)).toBe(true)
    const people = JSON.parse(readFileSync(pplJson, "utf8"))

    expect(people).toBeArrayOfSize(1000)
  })

  // Custom matchers: Vitest has no matchers for files => write your own
  // Tip: `expect.extend({ toExist(received) { return { pass, message } } })`
  it.todo("newFile should exist, using a custom matcher `toExist`")

  it.todo("some other file should not exist, using `.not.toExist`")

  it.todo(
    "`toExist` should fail with the helpful message 'expected file ... to exist'"
  )

  it.todo(
    "newFile should contain the line 'The first line', using a custom matcher with a param: `toContainLine`"
  )
})
