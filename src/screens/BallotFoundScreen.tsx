import React, { useCallback, useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ScreenMain from '../components/ScreenMain'
import TimeoutModal from '../components/TimeoutModal'
import ClientContext from '../contexts/ClientContext'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import usePollingScreenTimeout from '../hooks/usePollingScreenTimeout'

interface BallotFoundScreenProps {}

const BallotFoundScreen: React.FC<BallotFoundScreenProps> = () => {
  const VerifierClient = useContext(ClientContext)
  const linkResolver = useBoardSlugLinkResolver()
  const { t } = useTranslation()

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
  }, [VerifierClient])

  const nextPage = useCallback(
    (pairingCode?: string) => linkResolver(`/passkey/${pairingCode}`),
    [linkResolver]
  )

  const [timeout, modalOpen, setModalOpen] = usePollingScreenTimeout<
    string | undefined
  >(pollingAction, nextPage)

  return (
    <ScreenMain>
      <h1>{t('ballot-found.header')}</h1>
      <p className="max-w-[280px] page-content" role="text">
        <Trans i18nKey="ballot-found.description">
          Tap the <strong>Code entered</strong> button in the Mark.It app.
        </Trans>
      </p>

      <TimeoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        timeout={timeout}
        body={
          <p role="text">
            <Trans i18nKey="ballot-found.timeout">
              Tap the <strong>Code entered</strong> button in the Mark.It app.
            </Trans>
          </p>
        }
      />
    </ScreenMain>
  )
}

export default BallotFoundScreen
