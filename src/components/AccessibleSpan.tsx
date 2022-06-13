import React from 'react'

interface AccessibleSpanProps {
  screenReaderText: string
}

const AccessibleSpan: React.FC<
  AccessibleSpanProps & React.HTMLAttributes<HTMLSpanElement>
> = ({ screenReaderText, children, ...spanProps }) => {
  return (
    <>
      <span className="visually-hidden">{screenReaderText}</span>
      <span aria-hidden="true" {...spanProps}>
        {children}
      </span>
    </>
  )
}

export default AccessibleSpan
