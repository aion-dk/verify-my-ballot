import React, { useState } from 'react'
import { GoPlus, GoDash } from 'react-icons/go'
import AccessibleSpan from '../components/AccessibleSpan'
import ScreenMain from '../components/ScreenMain'
import { mod } from '../utils'
import config from '../config/config.json'
import { useTranslation } from 'react-i18next'

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitem_role
function isOpenMenuKey(key: string): boolean {
  return key === 'Enter' || key === ' ' || key === 'ArrowDown'
}

type FAQ = {
  questionTranslationKey: string
  answerTranslationKey: string
}

const faqs = config.faqs as FAQ[]

interface FAQScreenProps {}

const FAQScreen: React.FC<FAQScreenProps> = () => {
  const [activeQ, setActiveQ] = useState(-1)
  const { t } = useTranslation()

  const handleChange = (i: number) => {
    if (i === activeQ) {
      // None are active
      setActiveQ(-1)
      document.getElementById(`faq-${i}`)?.focus()
    } else {
      // Wrap around
      const newIndex = mod(i, faqs.length)
      setActiveQ(newIndex)
      document.getElementById(`faq-${newIndex}`)?.focus()
    }
  }

  const renderOpenQuestion = (faq: FAQ, i: number) => {
    return (
      <li
        key={i}
        className="w-[94%] md:w-[750px] list-none lg:w-[850px] bg-brand-blue dark:bg-transparent p-[1px] pt-[4px] text-white border-[3px] border-brand-blue dark:border-white cursor-pointer"
        id={`faq-${i}`}
        onClick={() => handleChange(i)}
        role="menuitem"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') {
            handleChange(i + 1)
            return
          }
          if (e.key === 'ArrowUp') {
            handleChange(i - 1)
          }
          if (isOpenMenuKey(e.key) || e.key === 'Escape') {
            handleChange(i)
          }
        }}
      >
        <div className="flex justify-between h-[60px] pl-[6px]">
          <p>
            <AccessibleSpan screenReaderText={t('faq.question-sr')}>
              Q:{' '}
            </AccessibleSpan>
            <span className="font-semibold">
              {t(faq.questionTranslationKey as any)}
            </span>
          </p>
          <div className="self-center mr-[6px]">
            <GoDash
              color="#FFF"
              size={40}
              title={t('faq.close-menu-label')}
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="bg-white text-brand-dark dark:bg-transparent dark:text-white dark:border-t-2 p-[8px] text-[18px]">
          <AccessibleSpan
            screenReaderText={t('faq.answer-sr')}
            className="text-[18px] font-semibold"
          >
            A:{' '}
          </AccessibleSpan>
          {t(faq.answerTranslationKey as any)}
        </p>
      </li>
    )
  }

  const renderClosedQuestion = (faq: FAQ, i: number) => {
    return (
      <li
        key={i}
        className="w-[90%] md:w-[700px] lg:w-[800px] bg-brand-background dark:bg-transparent cursor-pointer border-[3px] mb-[-3px] border-white  pl-[16px] pr-[4px] py-[8px] flex items-center justify-between"
        id={`faq-${i}`}
        onClick={() => handleChange(i)}
        role="menuitem"
        aria-haspopup="true"
        tabIndex={0}
        onKeyDown={e => {
          if (isOpenMenuKey(e.key)) {
            handleChange(i)
          }
        }}
      >
        <p>
          <AccessibleSpan screenReaderText={t('faq.question-sr')}>
            Q:{' '}
          </AccessibleSpan>
          <span className="font-semibold">
            {t(faq.questionTranslationKey as any)}
          </span>
        </p>
        <div className="text-brand-blue dark:text-white">
          <GoPlus
            size="26px"
            title={t('faq.open-menu-label')}
            aria-hidden="true"
          />
        </div>
      </li>
    )
  }

  return (
    <ScreenMain>
      <h1>{t('faq.header')}</h1>
      <ul className="flex flex-col items-center" role="menu" data-cy="faq-menu">
        {faqs.map((faq, i) => {
          if (i === activeQ) {
            return renderOpenQuestion(faq, i)
          } else {
            return renderClosedQuestion(faq, i)
          }
        })}
      </ul>
    </ScreenMain>
  )
}

export default FAQScreen
