import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FaQuestionCircle } from 'react-icons/fa'
import AccessibleSpan from '../components/AccessibleSpan'
import ScreenMain from '../components/ScreenMain'

interface AboutScreenProps {}

const AboutScreen: React.FC<AboutScreenProps> = () => {
  const { t } = useTranslation()

  return (
    <ScreenMain>
      <h1>{t('about.header')}</h1>
      <p className="max-w-[440px] page-content" role="text">
        <Trans i18nKey="about.description">
          This site serves as a ballot checking site to enable you to
          <strong> verify that your ballot was recorded correctly </strong> in
          your voting app and will be cast correctly in the digital ballot box.
        </Trans>
      </p>

      <div className="h-[2px] w-[60px] bg-red-500"></div>

      <div className="border-[2px] border-dotted border-brand-dark dark:border-white flex items-center p-[8px] mt-[80px] md:mt-[110px]">
        <div className="px-[8px] text-brand-blue dark:text-white">
          <FaQuestionCircle
            size="50px"
            aria-label={t('about.question-icon-label')}
            title={t('about.question-icon-label')}
            aria-hidden="true"
          />
        </div>
        <p className="flex flex-col">
          <span className="font-semibold">
            <AccessibleSpan screenReaderText={t('about.question-sr')}>
              Q:{' '}
            </AccessibleSpan>
            {t('about.question-text')}
          </span>
          <span className="max-w-[320px]">
            <AccessibleSpan
              screenReaderText={t('about.answer-sr')}
              className="font-semibold"
            >
              A:{' '}
            </AccessibleSpan>
            {t('about.answer-text')}
          </span>
        </p>
      </div>
    </ScreenMain>
  )
}

export default AboutScreen
