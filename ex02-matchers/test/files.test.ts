import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import "./fileMatchers"

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

  it("newFile should exist and contain the first and second line", () => {
    expect(existsSync(newFile)).toBe(true)
    expect(statSync(newFile).isFile()).toBe(true)

    const content = readFileSync(newFile, "utf8")
    expect(content).toContain("The first line")
    expect(content).toContain("The second line")
    // whole content in one go
    expect(content).toBe("The first line\nThe second line\n")
  })

  it("some other file in the same folder should not exist", () => {
    expect(existsSync(join(tmpDir, "otherFile.txt"))).toBe(false)
    expect(readdirSync(tmpDir)).toEqual(["newFile.txt"])
  })

  it("newFile should match the file `expected/newFile.txt`", async () => {
    // the only file matcher of Vitest: compares a string to the content of a file
    // - the 1st run creates the file, `vitest -u` updates it
    // - it is async => `await`
    const content = readFileSync(newFile, "utf8")
    await expect(content).toMatchFileSnapshot("./expected/newFile.txt")
  })

  test("json file", () => {
    expect(existsSync(pplJson)).toBe(true)
    const people = JSON.parse(readFileSync(pplJson, "utf8"))

    expect(people).toBeArrayOfSize(1000)
  })

  // Custom matchers: Vitest has no matchers for files => write your own
  // see `fileMatchers.ts`
  it("newFile should exist, using a custom matcher `toExist`", () => {
    expect(newFile).toExist()
  })

  it("some other file should not exist, using `.not.toExist`", () => {
    // `.not` comes for free
    expect(join(tmpDir, "otherFile.txt")).not.toExist()
  })

  it("`toExist` should fail with the helpful message 'expected file ... to exist'", () => {
    // who tests the matcher? => a failing assertion throws an Error
    const otherFile = join(tmpDir, "otherFile.txt")
    const action = () => expect(otherFile).toExist()

    expect(action).toThrow(`expected file ${otherFile} to exist`)
    // compare this to the message of the built-in matchers:
    expect(() => expect(existsSync(otherFile)).toBe(true)).toThrow(
      "expected false to be true"
    )
  })

  it("newFile should contain the line 'The first line', using a custom matcher with a param: `toContainLine`", () => {
    expect(newFile).toContainLine("The first line")
    expect(newFile).not.toContainLine("The third line")
    expect(() => expect(newFile).toContainLine("The third line")).toThrow(
      "to contain the line 'The third line'"
    )
  })
})
