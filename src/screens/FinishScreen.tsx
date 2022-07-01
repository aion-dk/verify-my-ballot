import React from 'react'

interface FinishScreenProps {}

const FinishScreen: React.FC<FinishScreenProps> = () => {
  return (
    <main id="content" className="page">
      <h1>Thank you for using the VerifyMyBallot site</h1>
      <p className="max-w-[300px] page-content">
        The verifying process is finished and you can close this site.
      </p>
    </main>
  )
}

export default FinishScreen
