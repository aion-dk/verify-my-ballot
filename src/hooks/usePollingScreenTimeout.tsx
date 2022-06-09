import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TIMEOUT_RETRIES, TIMEOUT_REMINDER_TIME } from '../constants'
import useTimeout from './useTimeout'

// NOTE: Remember to wrap pollingAction and nextPage in a useCallback

export default function usePollingScreenTimeout<T>(
  pollingAction: () => Promise<T>,
  nextPage: (payload?: T) => string
): [number, boolean, (modalOpen: boolean) => void] {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  // Base timeout
  const onTimeout = useCallback(() => {
    navigate('/expired')
    window.location.reload()
  }, [navigate])
  const [timeout, startTimeout] = useTimeout({
    intervalTimeout: 1000,
    retries: TIMEOUT_RETRIES,
    onTimeout,
  })

  // Pop-up reminder timeout
  const onReminderTimeout = useCallback(() => {
    setModalOpen(true)
  }, [setModalOpen])
  const [
    // eslint-disable-next-line
    _,
    startReminderTimeout,
  ] = useTimeout({
    intervalTimeout: 1000,
    retries: TIMEOUT_REMINDER_TIME,
    onTimeout: onReminderTimeout,
  })

  // On mount
  useEffect(() => {
    let isSubscribed = true

    const startPollingAction = async () => {
      const res = await pollingAction()
      if (isSubscribed) navigate(nextPage(res))
    }

    const baseInterval = startTimeout()
    const reminderInterval = startReminderTimeout()
    startPollingAction()

    // Component lifecycle cleanups
    return () => {
      isSubscribed = false
      clearInterval(baseInterval)
      clearInterval(reminderInterval)
    }
  }, [pollingAction, nextPage, navigate, startTimeout, startReminderTimeout])

  return [timeout, modalOpen, setModalOpen]
}
