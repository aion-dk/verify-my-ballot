import React from 'react'
import { useTranslation } from 'react-i18next'

interface AriaLiveRegionLoadingProps {
  loading: boolean
  body?: React.ReactNode
}

const AriaLiveRegionLoading: React.FC<AriaLiveRegionLoadingProps> = ({
  loading,
  body,
}) => {
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className="visually-hidden" role="status" aria-live="polite">
        {body ?? t('live-region-loading')}
      </div>
    )
  }
  return null
}

export default AriaLiveRegionLoading
