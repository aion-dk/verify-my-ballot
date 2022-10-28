import moment from 'moment'

export function formatTimeoutDuration(durationMs: number) {
  return moment().startOf('day').add(durationMs, 'seconds').format('mm:ss')
}

// Modulus operator to be for FAQ menu wrapping
export function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export const getTheme = () => {
  return localStorage.getItem('color-theme')
}

export function sleep(ms: number) {
  return new Promise((resolve, _reject) => setTimeout(() => resolve(null), ms))
}
