import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientContext from '../contexts/ClientContext'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import { getTheme } from '../utils'

interface FindMyBallotScreenProps {}

const FindMyBallotScreen: React.FC<FindMyBallotScreenProps> = () => {
  const navigate = useNavigate()
  const [ballotCheckingCode, setBallotCheckingCode] = useState('')
  const [inputError, setInputError] = useState(false)
  const VerifierClient = useContext(ClientContext)
  const linkResolver = useBoardSlugLinkResolver()

  const inputAriaAttributes: React.AriaAttributes = {
    'aria-label': 'Ballot checking code',
  }
  if (inputError) {
    inputAriaAttributes['aria-invalid'] = true
    inputAriaAttributes['aria-errormessage'] = 'ballot-code-invalid'
  }

  const getBg = () => {
    if (getTheme() === 'light') return 'orange'
    else return 'yellow'
  }

  return (
    <main id="content" className="page">
      <h1>Find my ballot</h1>
      <p className="max-w-[260px] page-content" role="text">
        Enter the ballot checking code displayed in the Mark.It app and click{' '}
        <strong>Enter</strong>
      </p>

      <form
        className="flex flex-col items-center gap-[14px]"
        onSubmit={async e => {
          e.preventDefault()

          try {
            console.debug('Finding ballot...')
            await VerifierClient.findBallot(ballotCheckingCode)
            console.debug('Ballot found!')
            navigate(linkResolver('/ballot-found'))
          } catch (e) {
            console.debug('An error occured while finding ballot:')
            console.debug(e)
            setInputError(true)
          }
        }}
      >
        <div
          id="ballot-code-invalid"
          className="bg-brand-orange dark:bg-brand-yellow p-[25px] max-w-[420px] mb-[20px]"
          style={{ display: inputError ? 'block' : 'none' }}
        >
          <h3 className="mb-[20px] dark:text-brand-darkBackground">
            Tracking Code Not Found
          </h3>
          <p className="font-bold text-center text-brand-dark">
            Please verify you entered the tracking code correctly. Be sure to
            match case.
          </p>
        </div>
        <input
          type="text"
          value={ballotCheckingCode}
          onChange={e => setBallotCheckingCode(e.target.value)}
          required
          placeholder="Ballot checking code"
          className="placeholder-gray-300"
          style={{ borderColor: inputError ? getBg() : '#000' }}
          data-cy="ballot-checking-code"
          {...inputAriaAttributes}
        />
        <button className="button" type="submit" data-cy="find-ballot-submit">
          Enter
        </button>
      </form>
    </main>
  )
}

export default FindMyBallotScreen
