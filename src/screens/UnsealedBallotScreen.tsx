import { ReadableContestSelection } from '@aion-dk/js-client/dist/lib/av_client/types'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ScreenMain from '../components/ScreenMain'
import ClientContext from '../contexts/ClientContext'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'

interface UnsealedBallotScreenProps {}

const UnsealedBallotScreen: React.FC<UnsealedBallotScreenProps> = () => {
  const navigate = useNavigate()
  const [contestSelections, setContestSelections] = React.useState<
    ReadableContestSelection[]
  >([])
  const VerifierClient = useContext(ClientContext)
  const linkResolver = useBoardSlugLinkResolver()
  const { t } = useTranslation()

  useEffect(() => {
    try {
      console.debug('Decrypting...')
      const decryptedBallot = VerifierClient.decryptBallot()
      console.debug(decryptedBallot)
      console.debug('Getting readable ballot...')
      const ballot = VerifierClient.getReadableContestSelections(
        decryptedBallot,
        'en'
      )
      console.debug('Got ballot:')
      console.debug(ballot)
      setContestSelections(ballot)
    } catch (e) {
      console.debug(e)
      if (process.env.NODE_ENV === 'production') navigate(linkResolver(''))
    }
  }, [navigate, VerifierClient, linkResolver])

  return (
    <ScreenMain>
      <h1>{t('unsealed-ballot.header')}</h1>
      <ul className="mb-[20px]" data-cy="ballot-choices">
        {contestSelections.map(cs => (
          <li key={cs.reference} className="dark:text-white">
            <span className="font-bold dark:text-white">{cs.title}:</span>{' '}
            {cs.optionSelections[0]?.title}
          </li>
        ))}
      </ul>
      <button
        className="button"
        onClick={() => {
          navigate(linkResolver('/finish'))
        }}
        data-cy="finish-button"
      >
        {t('unsealed-ballot.button')}
      </button>
    </ScreenMain>
  )
}

export default UnsealedBallotScreen
