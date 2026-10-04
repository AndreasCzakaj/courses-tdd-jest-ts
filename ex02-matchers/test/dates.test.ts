import {
  getBirthday,
  getMeetingTime,
  getConferenceStart,
  getEventTimestamp,
  getWorkStart,
  getProjectDeadline,
} from "@src/dates"
import "./dateMatchers"

// matchers marked with (*) come from the library `jest-extended`

describe("dates.test", () => {
  const birthday = getBirthday()
  const meetingTime = getMeetingTime()
  const conferenceStart = getConferenceStart()
  const eventTimestamp = getEventTimestamp()
  const workStart = getWorkStart()
  const projectDeadline = getProjectDeadline()

  const hoursAndMinutes = (date: Date) =>
    date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })

  // date assertions
  it("birthday should be 1990-05-15", () => {
    // toEqual compares the point in time ...
    expect(birthday).toEqual(new Date(1990, 4, 15))
    // ... toBe compares identity (===), and this is another object
    expect(birthday).not.toBe(new Date(1990, 4, 15))
  })

  it("birthday should be before today", () => {
    expect(birthday.getTime()).toBeLessThan(Date.now())
    expect(birthday).toBeBefore(new Date()) // (*)
  })

  it("birthday should be after 1980-01-01", () => {
    expect(birthday).toBeAfter(new Date(1980, 0, 1)) // (*)
  })

  // There are no native matchers for the parts of a date (year, month, day),
  // neither in vitest / jest nor in `jest-extended`.
  // (a) own custom matchers, see `dateMatchers.ts`: `expect()` only takes the actual value
  // (b) a range with `toBeBetween`, if a range says what you mean
  // (c) ugly: pick the part yourself, so `expect()` gets a derived value
  //     => the failure message only talks about numbers, not about the date
  it("birthday should be in May", () => {
    expect(birthday).toBeInMonth(5) // (a) 1-based!
    // (b) says more than asked for: "in May 1990"
    expect(birthday).toBeBetween(new Date(1990, 4, 1), new Date(1990, 4, 31)) // (*)
    // (c) months are 0-based!
    expect(birthday.getMonth()).toBe(4)
    expect(birthday.toLocaleString("en", { month: "long" })).toBe("May")
  })

  it("birthday should be in year 1990", () => {
    expect(birthday).toBeInYear(1990) // (a)
    expect(birthday).toBeBetween(new Date(1990, 0, 1), new Date(1990, 11, 31)) // (b) (*)
    expect(birthday.getFullYear()).toBe(1990) // (c)
  })

  it("birthday should be on day 15", () => {
    expect(birthday).toBeOnDayOfMonth(15) // (a)
    // (c) getDate() is the day of the month, getDay() is the day of the week!
    expect(birthday.getDate()).toBe(15)
  })

  it("project deadline should be after 2024-01-01", () => {
    expect(projectDeadline).toBeAfter(new Date(2024, 0, 1)) // (*)
  })

  it("project deadline should be between 2024-01-01 and 2025-12-31", () => {
    expect(projectDeadline).toBeBetween(
      new Date(2024, 0, 1),
      new Date(2025, 11, 31)
    ) // (*)
  })

  // date + time assertions
  it("meeting time should be 2024-03-20T14:30:00", () => {
    expect(meetingTime).toEqual(new Date(2024, 2, 20, 14, 30, 0))
  })

  it("meeting time should be before now", () => {
    expect(meetingTime).toBeBefore(new Date()) // (*)
  })

  it("meeting time should have hour 14", () => {
    expect(meetingTime.getHours()).toBe(14)
  })

  it("meeting time should have minute 30", () => {
    expect(meetingTime.getMinutes()).toBe(30)
  })

  it("meeting time should be in March 2024", () => {
    expect([meetingTime.getFullYear(), meetingTime.getMonth()]).toEqual([
      2024, 2,
    ])
  })

  // time assertions
  it("work start should be 09:00", () => {
    expect(hoursAndMinutes(workStart)).toBe("09:00")
  })

  it("work start should be before noon (12:00)", () => {
    expect(workStart.getHours()).toBeLessThan(12)
  })

  it("work start should have hour 9", () => {
    expect(workStart.getHours()).toBe(9)
  })

  it("work start should be between 08:00 and 10:00", () => {
    expect(workStart.getHours()).toBeWithin(8, 10) // (*) start incl., end excl.
  })

  // time zone assertions
  it("conference start should be 2024-06-01 09:00 in Europe/Berlin", () => {
    // a `Date` has no time zone => format it for the time zone you want to see
    const inBerlin = conferenceStart.toLocaleString("sv-SE", {
      timeZone: "Europe/Berlin",
    })
    expect(inBerlin).toBe("2024-06-01 09:00:00")
  })

  it("conference start should be 2024-06-01T07:00:00Z", () => {
    // 09:00 in Berlin is 07:00 UTC in summer
    expect(conferenceStart).toEqual(new Date("2024-06-01T07:00:00Z"))
    expect(conferenceStart.toISOString()).toBe("2024-06-01T07:00:00.000Z")
  })

  // timestamp assertions (UTC)
  it("event timestamp should be 2024-01-15T10:30:00Z", () => {
    expect(eventTimestamp).toEqual(new Date("2024-01-15T10:30:00Z"))
  })

  it("event timestamp should be in the past", () => {
    expect(eventTimestamp).toBeBefore(new Date()) // (*)
  })

  it("event timestamp should be close to 2024-01-15T10:30:00Z within 1 second", () => {
    const expected = new Date("2024-01-15T10:30:00Z")
    const deltaInMillis = Math.abs(eventTimestamp.getTime() - expected.getTime())
    expect(deltaInMillis).toBeLessThanOrEqual(1000)
  })

  // Advanced
  it("birthday should be more than 30 years before today", () => {
    const thirtyYearsAgo = new Date()
    thirtyYearsAgo.setFullYear(thirtyYearsAgo.getFullYear() - 30)

    expect(birthday).toBeBefore(thirtyYearsAgo) // (*)
  })

  it("meeting time should be at least 2 hours after 12:00 same day", () => {
    const noon = new Date(meetingTime)
    noon.setHours(12, 0, 0, 0)

    const durationInMillis = meetingTime.getTime() - noon.getTime()
    expect(durationInMillis).toBeGreaterThanOrEqual(2 * 60 * 60 * 1000)
  })

  // Combined assertions
  it("should combine multiple date assertions in one test", () => {
    expect(birthday).toBeValidDate() // (*)
    expect(birthday).toBeBetween(new Date(1980, 0, 1), new Date()) // (*)
    expect([
      birthday.getFullYear(),
      birthday.getMonth() + 1,
      birthday.getDate(),
    ]).toEqual([1990, 5, 15])
  })

  // "today" and "now" are not deterministic ...
  describe("with a fake clock", () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date("2024-01-15T10:30:00Z"))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it("should make 'now' deterministic", () => {
      // ... unless the test controls the clock
      expect(new Date()).toEqual(eventTimestamp)
      expect(Date.now()).toBe(eventTimestamp.getTime())
    })
  })
})
