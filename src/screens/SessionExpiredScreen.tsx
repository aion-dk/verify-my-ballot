import React from 'react'
import { Link } from 'react-router-dom'
import { TbMoodSad } from 'react-icons/tb'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import ScreenMain from '../components/ScreenMain'
import { useTranslation } from 'react-i18next'

interface SessionExpiredScreenProps {}

const SessionExpiredScreen: React.FC<SessionExpiredScreenProps> = () => {
  const linkResolver = useBoardSlugLinkResolver()
  const { t } = useTranslation()

  return (
    <ScreenMain>
      <h1>{t('expired.header')}</h1>
      <div className="text-brand-dark dark:text-white">
        <TbMoodSad size="90px" aria-hidden="true" />
      </div>

      <p className="max-w-[390px] page-content">{t('expired.description')}</p>
      <Link className="button" to={linkResolver('')} data-cy="reset-button">
        {t('expired.button')}
      </Link>
    </ScreenMain>
  )
}

export default SessionExpiredScreen
