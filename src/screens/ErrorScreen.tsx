import React from 'react'
import { useTranslation } from 'react-i18next'
import ScreenMain from '../components/ScreenMain'

interface ErrorScreenProps {}

const ErrorScreen: React.FC<ErrorScreenProps> = () => {
  const { t } = useTranslation()

  return (
    <ScreenMain className="items-center">
      <h1 className="header-bigger text-brand-blue  mt-12 md:mt-20">
        {t('error.header')}
      </h1>
      <p className="content max-w-550">{t('error.description')}</p>
    </ScreenMain>
  )
}

export default ErrorScreen
