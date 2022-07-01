import React, { useCallback } from 'react'
import TimeoutModal from '../components/TimeoutModal'
import usePollingScreenTimeout from '../hooks/usePollingScreenTimeout'
import VerifierClient from '../VerifierClient'

interface BallotFoundScreenProps {}

const BallotFoundScreen: React.FC<BallotFoundScreenProps> = () => {
  const pollingAction = useCallback(async () => {
    try {
      console.debug('Polling for spoil request...')
      const spoilRequestAddress = await VerifierClient.pollForSpoilRequest()
      console.debug('Got spoil request address: ' + spoilRequestAddress)
      console.debug('Submitting verifier key...')
      const pairingCode = await VerifierClient.submitVerifierKey(
        spoilRequestAddress
      )
      console.debug('Pairing code:', pairingCode)
      return pairingCode
    } catch (e) {
      console.debug('An error occured while polling for spoil request:')
      console.debug(e)
    }
  }, [])

  const nextPage = useCallback(
    (pairingCode?: string) => `/passkey/${pairingCode}`,
    []
  )

  const [timeout, modalOpen, setModalOpen] = usePollingScreenTimeout<
    string | undefined
  >(pollingAction, nextPage)

  return (
    <main className="page">
      <h1>Ballot found</h1>
      <p className="max-w-[280px] page-content" role="text">
        Tap the <strong>Code entered</strong> button in the
        Mark.It app.
      </p>

      <TimeoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        timeout={timeout}
        body={<p role="text">
          Tap the <strong>Code entered</strong> button in the
          Mark.It app.
        </p>}
      />
    </main>
  )
}

export default BallotFoundScreen
