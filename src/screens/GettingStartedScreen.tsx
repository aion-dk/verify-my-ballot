import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import ScreenMain from '../components/ScreenMain'

interface GettingStartedScreenProps {}

const GettingStartedScreen: React.FC<GettingStartedScreenProps> = () => {
  const navigate = useNavigate()
  const linkResolver = useBoardSlugLinkResolver()

  return (
    <ScreenMain>
      <h1>Welcome to the VerifyMyBallot Site</h1>
      <p className="max-w-[320px] page-content">
        Use this site to verify your ballot was recorded and sealed correctly.
      </p>
      <button
        data-cy="get-started-button"
        onClick={() => {
          navigate(linkResolver('/find-my-ballot'))
        }}
        className="button"
      >
        Get started
        <FiChevronRight color="#fff" size="24px" aria-hidden="true" />
      </button>
    </ScreenMain>
  )
}

export default GettingStartedScreen
