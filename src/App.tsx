import React, { useEffect, useState } from 'react'
import AppRouter from './AppRouter'
import VerifierClient from './VerifierClient'

const App: React.FC = () => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      await VerifierClient.initialize()
      setInitialized(true)
    }

    initialize()
  }, [])

  if (!initialized) return <></>

  return <AppRouter />
}

export default App
