import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import ScreenMain from '../components/ScreenMain'
import { useTranslation } from 'react-i18next'

interface GettingStartedScreenProps {}

const GettingStartedScreen: React.FC<GettingStartedScreenProps> = () => {
  const navigate = useNavigate()
  const linkResolver = useBoardSlugLinkResolver()
  const { t } = useTranslation()

  return (
    <ScreenMain>
      <h1>{t('welcome.header')}</h1>
      <p className="max-w-[320px] page-content">{t('welcome.description')}</p>
      <button
        data-cy="get-started-button"
        onClick={() => {
          navigate(linkResolver('/find-my-ballot'))
        }}
        className="button"
      >
        {t('welcome.button')}

        <FiChevronRight color="#fff" size="24px" aria-hidden="true" />
      </button>
    </ScreenMain>
  )
}

export default GettingStartedScreen
