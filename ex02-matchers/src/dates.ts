// JavaScript has only 1 type for dates: `Date`, a point in time.
// There is no "date only", no "time only", and a `Date` does not know its time zone.
// Mind the trap: months are 0-based, i.e. 4 is May!

export function getBirthday(): Date {
  return new Date(1990, 4, 15)
}

export function getMeetingTime(): Date {
  return new Date(2024, 2, 20, 14, 30, 0)
}

/** 09:00 in Europe/Berlin (summer time, i.e. UTC+2) */
export function getConferenceStart(): Date {
  return new Date("2024-06-01T09:00:00+02:00")
}

export function getEventTimestamp(): Date {
  return new Date("2024-01-15T10:30:00Z")
}

/** no "time only" type => it's 09:00 on 1970-01-01 */
export function getWorkStart(): Date {
  return new Date(1970, 0, 1, 9, 0)
}

export function getProjectDeadline(): Date {
  return new Date(2024, 11, 31)
}
