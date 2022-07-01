import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import VerifierClient from '../VerifierClient'
import TimeoutModal from '../components/TimeoutModal'
import usePollingScreenTimeout from '../hooks/usePollingScreenTimeout'
import AccessibleSpan from '../components/AccessibleSpan'

interface PasskeyScreenProps {}

const PasskeyScreen: React.FC<PasskeyScreenProps> = () => {
  const { pairingCode } = useParams<{ pairingCode: string }>()

  const pollingAction = useCallback(async () => {
    try {
      console.debug('Polling for commitment opening...')
      await VerifierClient.pollForCommitmentOpening()
      console.debug('Done polling!')
    } catch (e) {
      console.debug('An error occured while polling for commitment opening...')
      console.debug(e)
    }
  }, [])

  const nextPage = useCallback(() => '/unsealed-ballot', [])

  const [timeout, modalOpen, setModalOpen] = usePollingScreenTimeout(
    pollingAction,
    nextPage
  )

  return (
    <main className="page">
      <h1>Passkey</h1>
      <p className="max-w-[420px] page-content">
        Please confirm that the following key matches the one displayed in the
        Mark.It app.
      </p>
      <p className="key dark:text-white" data-cy="pairing-code">
        <AccessibleSpan screenReaderText={`The passkey is: ${pairingCode}`}>
          {pairingCode}
        </AccessibleSpan>
      </p>

      <TimeoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        timeout={timeout}
        body={"You have to confirm that the pairing codes match in the Mark.It app."}
      />
    </main>
  )
}

export default PasskeyScreen
