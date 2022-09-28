import React from 'react'

interface ScreenMainProps {
  className?: string
  children?: React.ReactNode[] | React.ReactNode
}

const ScreenMain: React.FC<ScreenMainProps> = ({ className, children }) => {
  return (
    <main id="content" className={`page${className ? ' ' + className : ''}`}>
      {children}
    </main>
  )
}

export default ScreenMain
