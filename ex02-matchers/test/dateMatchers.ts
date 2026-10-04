// There are no matchers for the parts of a date (year, month, day), neither in
// vitest / jest nor in `jest-extended` => we write our own (see also `fileMatchers.ts`).
// `expect()` still only takes the ACTUAL value, the matcher does the rest.
const formatDate = (date: Date) => date.toLocaleDateString("sv-SE") // e.g. 1990-05-15

expect.extend({
  toBeInYear(received: Date, expected: number) {
    const pass = received.getFullYear() === expected
    return {
      pass,
      message: () =>
        pass
          ? `expected ${formatDate(received)} not to be in year ${expected}`
          : `expected ${formatDate(received)} to be in year ${expected}`,
    }
  },

  /** @param expected 1-based, i.e. 5 is May (unlike `Date.getMonth()`) */
  toBeInMonth(received: Date, expected: number) {
    const pass = received.getMonth() + 1 === expected
    return {
      pass,
      message: () =>
        pass
          ? `expected ${formatDate(received)} not to be in month ${expected}`
          : `expected ${formatDate(received)} to be in month ${expected}`,
    }
  },

  toBeOnDayOfMonth(received: Date, expected: number) {
    const pass = received.getDate() === expected
    return {
      pass,
      message: () =>
        pass
          ? `expected ${formatDate(received)} not to be on day ${expected} of the month`
          : `expected ${formatDate(received)} to be on day ${expected} of the month`,
    }
  },
})

// The types of the new matchers, for TypeScript and your IDE: see dateMatchers.types.d.ts
