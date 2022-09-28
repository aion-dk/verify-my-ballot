import React from 'react'
import ScreenMain from '../components/ScreenMain'

interface FinishScreenProps {}

const FinishScreen: React.FC<FinishScreenProps> = () => {
  return (
    <ScreenMain>
      <h1>Thank you for using the VerifyMyBallot site</h1>
      <p className="max-w-[300px] page-content">
        The verifying process is finished and you can close this site.
      </p>
    </ScreenMain>
  )
}

export default FinishScreen
