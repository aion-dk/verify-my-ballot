import React, { useEffect, useState } from 'react'
import AppRouter from './AppRouter'
import VerifierClient from './VerifierClient'

const App: React.FC = () => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      try {
        await VerifierClient.initialize()
      } catch (e) {
        console.error(
          'There was an error while initializing js-client, the site will not work properly in this state.'
        )
        console.error(e)
      } finally {
        setInitialized(true)
      }
    }

    initialize()
  }, [])

  if (!initialized) return <></>

  return <div id="root"><AppRouter /></div>
}

export default App
