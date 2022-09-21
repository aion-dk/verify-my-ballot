import React from 'react'
import { Link } from 'react-router-dom'
import { TbMoodSad } from 'react-icons/tb'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'

interface SessionExpiredScreenProps {}

const SessionExpiredScreen: React.FC<SessionExpiredScreenProps> = () => {
  const linkResolver = useBoardSlugLinkResolver()

  return (
    <main id="content" className="page">
      <h1>Session expired</h1>
      {/* <img src={sad} alt="sad smiley" className="w-[110px]" /> */}
      <div className="text-brand-dark dark:text-white">
        <TbMoodSad size="90px" />
      </div>

      <p className="max-w-[390px] page-content">
        No action was found on the board within expected period of time. Try
        verifying again.
      </p>
      <Link className="button" to={linkResolver('')}>
        Reset
      </Link>
    </main>
  )
}

export default SessionExpiredScreen
