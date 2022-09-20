import React from 'react'

interface AriaLiveRegionLoadingProps {
  loading: boolean
  body?: React.ReactNode
}

const AriaLiveRegionLoading: React.FC<AriaLiveRegionLoadingProps> = ({
  loading,
  body,
}) => {
  if (loading) {
    return (
      <div className="visually-hidden" role="status" aria-live="polite">
        {body ?? 'Loading'}
      </div>
    )
  }
  return null
}

export default AriaLiveRegionLoading
