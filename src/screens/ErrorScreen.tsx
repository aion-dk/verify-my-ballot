import React from 'react'
import ScreenMain from '../components/ScreenMain'

interface ErrorScreenProps {}

const ErrorScreen: React.FC<ErrorScreenProps> = () => {
  return (
    <ScreenMain className="items-center">
      <h1 className="header-bigger text-brand-blue  mt-12 md:mt-20">Error</h1>
      <p className="content max-w-550">
        A valid election could not be loaded based on the inferred information.
      </p>
    </ScreenMain>
  )
}

export default ErrorScreen
