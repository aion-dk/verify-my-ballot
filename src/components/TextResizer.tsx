import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiMinus, FiPlus } from 'react-icons/fi'

function changeRootFontSize(fontSizeChange: number) {
  const rootElement = document.querySelector(':root') as HTMLElement | null
  if (rootElement) {
    const fontSize = rootElement.style.fontSize || '18px'
    const sizeValue = parseInt(fontSize.split('px')[0])
    if (!isNaN(sizeValue)) {
      rootElement.style.fontSize = `${sizeValue + fontSizeChange}px`
    }
  }
}

interface TextResizerProps {}

const TextResizer: React.FC<TextResizerProps> = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center bg-white dark:bg-transparent py-[6px] px-[6px] rounded-full border-[2px] border-brand-dark dark:border-white dark:text-white">
      <button
        className="mr-[18px] ml-[8px] active:font-bold"
        onClick={() => changeRootFontSize(-2)}
        aria-label={t('text-resizer.decrease-font-size')}
        data-cy="decrease-font-size"
      >
        <FiMinus
          title={t('text-resizer.decrease-font-size')}
          aria-hidden="true"
        />
      </button>
      <div className="whitespace-nowrap">{t('text-resizer.text-size')}</div>
      <button
        className="ml-[18px] mr-[8px] active:font-bold"
        onClick={() => changeRootFontSize(2)}
        aria-label={t('text-resizer.increase-font-size')}
        data-cy="increase-font-size"
      >
        <FiPlus
          title={t('text-resizer.increase-font-size')}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export default TextResizer
