import { ReadableContestSelection } from '@aion-dk/js-client/dist/lib/av_client/types'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ScreenMain from '../components/ScreenMain'
import ContestSelections from '../components/ContestSelections'
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
      const decryptedBallot = VerifierClient.decryptBallot()
      const ballot = VerifierClient.getReadableContestSelections(
        decryptedBallot,
        'en'
      )
      setContestSelections(ballot)
    } catch (e) {
      console.debug(e)
      if (process.env.NODE_ENV === 'production') navigate(linkResolver(''))
    }
  }, [navigate, VerifierClient, linkResolver])

  return (
    <ScreenMain>
      <h1>{t('unsealed-ballot.header')}</h1>

      <ContestSelections selections={contestSelections} />

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
