import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface ContrastPickerProps {}

const ContrastPicker: React.FC<ContrastPickerProps> = () => {
  const { t } = useTranslation()

  const changeTheme = (to: 'light' | 'dark') => {
    if (localStorage.getItem('color-theme')) {
      if (to === 'dark') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
        document.documentElement.setAttribute('data-theme', 'light')
      }
    } else {
      if (to === 'light') {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
        document.documentElement.setAttribute('data-theme', 'light')
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    }
  }

  return (
    <div className="flex items-center gap-3">
      <p className="font-bold dark:text-white">
        {t('contrast-picker.contrast-options')}
      </p>

      <button
        onClick={() => changeTheme('light')}
        className="w-[54px] h-[42px] bg-brand-blue p-[2px] flex justify-center"
      >
        <div className="h-full aspect-square rounded-full flex justify-center items-center bg-white text-brand-darkBackground">
          ABC
        </div>
      </button>
      <button
        onClick={() => changeTheme('dark')}
        className="w-[54px] h-[42px] text-white items-center dark:border-white bg-brand-darkBackground border-brand-darkBackground  border-2 p-[2px] flex justify-center"
      >
        ABC
      </button>
    </div>
  )
}

export default ContrastPicker
