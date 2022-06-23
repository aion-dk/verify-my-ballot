import { ReadableContestSelection } from '@aion-dk/js-client/dist/lib/av_client/types'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VerifierClient from '../VerifierClient'

interface UnsealedBallotScreenProps {}

const UnsealedBallotScreen: React.FC<UnsealedBallotScreenProps> = () => {
  const navigate = useNavigate()
  const [contestSelections, setContestSelections] = React.useState<
    ReadableContestSelection[]
  >([])

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
      if (process.env.NODE_ENV === 'production') navigate('/')
    }
  }, [navigate])

  return (
    <main className="page">
      <h1>Unsealed ballot</h1>
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
          navigate('/finish')
        }}
        data-cy="finish-button"
      >
        Finish
      </button>
    </main>
  )
}

export default UnsealedBallotScreen
