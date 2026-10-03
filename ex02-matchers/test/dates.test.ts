import {
  getBirthday,
  getMeetingTime,
  getConferenceStart,
  getEventTimestamp,
  getWorkStart,
  getProjectDeadline,
} from "@src/dates"

describe("dates.test", () => {
  const birthday = getBirthday()
  const meetingTime = getMeetingTime()
  const conferenceStart = getConferenceStart()
  const eventTimestamp = getEventTimestamp()
  const workStart = getWorkStart()
  const projectDeadline = getProjectDeadline()

  // date assertions
  it.todo("birthday should be 1990-05-15")
  it.todo("birthday should be before today")
  it.todo("birthday should be after 1980-01-01")
  it.todo("birthday should be in May")
  it.todo("birthday should be in year 1990")
  it.todo("birthday should be on day 15")
  it.todo("project deadline should be after 2024-01-01")
  it.todo("project deadline should be between 2024-01-01 and 2025-12-31")

  // date + time assertions
  it.todo("meeting time should be 2024-03-20T14:30:00")
  it.todo("meeting time should be before now")
  it.todo("meeting time should have hour 14")
  it.todo("meeting time should have minute 30")
  it.todo("meeting time should be in March 2024")

  // time assertions
  it.todo("work start should be 09:00")
  it.todo("work start should be before noon (12:00)")
  it.todo("work start should have hour 9")
  it.todo("work start should be between 08:00 and 10:00")

  // time zone assertions
  it.todo("conference start should be 2024-06-01 09:00 in Europe/Berlin")
  it.todo("conference start should be 2024-06-01T07:00:00Z")

  // timestamp assertions (UTC)
  it.todo("event timestamp should be 2024-01-15T10:30:00Z")
  it.todo("event timestamp should be in the past")
  it.todo(
    "event timestamp should be close to 2024-01-15T10:30:00Z within 1 second"
  )

  // Advanced
  it.todo("birthday should be more than 30 years before today")
  it.todo("meeting time should be at least 2 hours after 12:00 same day")

  // Combined assertions
  it.todo("TODO: combine multiple date assertions in one test")

  // "today" and "now" are not deterministic ...
  it.todo("should make 'now' deterministic (tip: `vi.useFakeTimers`)")
})
