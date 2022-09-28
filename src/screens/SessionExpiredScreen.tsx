import React from 'react'
import { Link } from 'react-router-dom'
import { TbMoodSad } from 'react-icons/tb'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import ScreenMain from '../components/ScreenMain'

interface SessionExpiredScreenProps {}

const SessionExpiredScreen: React.FC<SessionExpiredScreenProps> = () => {
  const linkResolver = useBoardSlugLinkResolver()

  return (
    <ScreenMain>
      <h1>Session expired</h1>
      <div className="text-brand-dark dark:text-white">
        <TbMoodSad size="90px" aria-hidden="true" />
      </div>

      <p className="max-w-[390px] page-content">
        No action was found on the board within expected period of time. Try
        verifying again.
      </p>
      <Link className="button" to={linkResolver('')} data-cy="reset-button">
        Reset
      </Link>
    </ScreenMain>
  )
}

export default SessionExpiredScreen
