import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

interface GettingStartedScreenProps {}

const GettingStartedScreen: React.FC<GettingStartedScreenProps> = () => {
  const navigate = useNavigate()

  return (
    <main className="page ">
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
        <MdOutlineKeyboardArrowRight
          color="#fff"
          size="28px"
          aria-hidden="true"
        />
      </button>
    </main>
  )
}

export default GettingStartedScreen
