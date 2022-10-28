import React, { useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import TimeoutModal from '../components/TimeoutModal'
import usePollingScreenTimeout from '../hooks/usePollingScreenTimeout'
import AccessibleSpan from '../components/AccessibleSpan'
import ClientContext from '../contexts/ClientContext'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import ScreenMain from '../components/ScreenMain'
import { useTranslation } from 'react-i18next'

interface PasskeyScreenProps {}

const PasskeyScreen: React.FC<PasskeyScreenProps> = () => {
  const { pairingCode } = useParams<{ pairingCode: string }>()
  const VerifierClient = useContext(ClientContext)
  const linkResolver = useBoardSlugLinkResolver()
  const { t } = useTranslation()

  const pollingAction = useCallback(async () => {
    try {
      console.debug('Polling for commitment opening...')
      await VerifierClient.pollForCommitmentOpening()
      console.debug('Done polling!')
    } catch (e) {
      console.debug('An error occured while polling for commitment opening...')
      console.debug(e)
    }
  }, [VerifierClient])

  const nextPage = useCallback(
    () => linkResolver('/unsealed-ballot'),
    [linkResolver]
  )

  const [timeout, modalOpen, setModalOpen] = usePollingScreenTimeout(
    pollingAction,
    nextPage
  )

  return (
    <ScreenMain>
      <h1>{t('passkey.header')}</h1>
      <p className="max-w-[420px] page-content">{t('passkey.description')}</p>
      <p className="key dark:text-white" data-cy="pairing-code">
        <AccessibleSpan
          screenReaderText={t('passkey.sr-passkey', { pairingCode })}
        >
          {pairingCode}
        </AccessibleSpan>
      </p>

      <TimeoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        timeout={timeout}
        body={<p>{t('passkey.timeout')}</p>}
      />
    </ScreenMain>
  )
}

export default PasskeyScreen
