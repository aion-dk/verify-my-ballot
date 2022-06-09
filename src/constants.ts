export const DEFAULT_ELECTION_URL =
  process.env.REACT_APP_DEFAULT_ELECTION_URL ||
  'https://dbb.us-avx.dev.container.assembly-voting.com/us'

const _timeoutRetries = process.env.REACT_APP_TIMEOUT_RETRIES
export const TIMEOUT_RETRIES = _timeoutRetries ? parseInt(_timeoutRetries) : 120

export const MOCK_RESPONSE_MS = 20000

const _timeoutReminderTime = process.env.REACT_APP_TIMEOUT_REMINDER_TIME
export const TIMEOUT_REMINDER_TIME = _timeoutReminderTime
  ? parseInt(_timeoutReminderTime)
  : process.env.REACT_APP_TESTING
  ? MOCK_RESPONSE_MS / 1000 / 2 // half of mock response time, so you can see the popup
  : 30
