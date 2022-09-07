import React from 'react'

interface ErrorScreenProps {}

const ErrorScreen: React.FC<ErrorScreenProps> = () => {
  return (
    <main className="page items-center">
      <h1 className="header-bigger text-brand-blue  mt-12 md:mt-20">Error</h1>
      <p className="content max-w-550">
        A valid election could not be loaded based on the inferred information.
      </p>
    </main>
  )
}

export default ErrorScreen
