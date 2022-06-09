import { useCallback, useEffect, useRef, useState } from 'react'

interface TimeoutConfig {
  intervalTimeout: number
  retries: number
  onTimeout: () => void
}

export default function useTimeout({
  intervalTimeout,
  retries,
  onTimeout,
}: TimeoutConfig): [number, () => NodeJS.Timer] {
  const intervalRef = useRef<NodeJS.Timer | null>(null)
  const [timeout, setTimeout] = useState<number>(retries)

  const startTimeout = useCallback(() => {
    const interval = setInterval(() => {
      setTimeout(timeout => timeout - 1)
    }, intervalTimeout)

    intervalRef.current = interval

    return interval
  }, [intervalTimeout])

  useEffect(() => {
    if (timeout === 0) {
      onTimeout()

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timeout, onTimeout])

  return [timeout, startTimeout]
}
