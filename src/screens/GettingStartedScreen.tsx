import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

interface GettingStartedScreenProps {}

const GettingStartedScreen: React.FC<GettingStartedScreenProps> = () => {
  const navigate = useNavigate()

  return (
    <main id="content" className="page ">
      <h1>Welcome to the VerifyMyBallot Site</h1>
      <p className="max-w-[320px] page-content">
        Use this site to verify your ballot was recorded and sealed correctly.
      </p>
      <button
        data-cy="get-started-button"
        onClick={() => {
          navigate('/find-my-ballot')
        }}
        className="button"
      >
        Get started
        <FiChevronRight color="#fff" size="24px" aria-hidden="true" />
      </button>
    </main>
  )
}

export default GettingStartedScreen
