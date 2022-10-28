import React from 'react'
import { useTranslation } from 'react-i18next'
import ScreenMain from '../components/ScreenMain'

interface FinishScreenProps {}

const FinishScreen: React.FC<FinishScreenProps> = () => {
  const { t } = useTranslation()

  return (
    <ScreenMain>
      <h1>{t('finish.header')}</h1>
      <p className="max-w-[300px] page-content">{t('finish.description')}</p>
    </ScreenMain>
  )
}

export default FinishScreen
