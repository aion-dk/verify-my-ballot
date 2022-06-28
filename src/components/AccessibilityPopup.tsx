import React from 'react'
import { IoMdClose } from 'react-icons/io'
import Modal from 'react-modal'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { getTheme } from '../utils'
import TextResizer from './TextResizer'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: '600px',
    overflow: 'initial',
    border: 'none',
    background: 'none',
  },
}

interface TimeoutModalProps {
  isOpen: boolean
  onClose: () => void
}

const AccessibilityPopup: React.FC<TimeoutModalProps> = ({
  isOpen,
  onClose,
}) => {
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Accessibility adjustments pop up"
      style={customStyles}
    >
      <div
        className="flex flex-col shadow-lg bg-white dark:bg-brand-darkBackground p-[30px] rounded-3xl"
        data-cy="accessibility-modal"
      >
        <div className="flex items-center justify-between mb-[30px] ">
          <h3 className="text-left">Acessibility adjustments</h3>
          <div className="p-2 cursor-pointer dark:text-white">
            <IoMdClose
              aria-label="close button"
              size="24px"
              onClick={onClose}
            />
          </div>
        </div>

        <button
          onClick={() => changeTheme('light')}
          aria-label="high contrast"
          className={`contrast-button bg-brand-blue text-white dark:bg-brand-darkBackground dark:border-white dark:text-white`}
        >
          <IoSunny size="36px" />
          <p className="font-bold mt-2">High contrast</p>
        </button>
        <button
          onClick={() => changeTheme('dark')}
          aria-label="dark contrast"
          className={`contrast-button mt-4 dark:bg-white dark:text-brand-darkBackground dark:border-white`}
        >
          <IoMoon size="36px" />
          <p className="font-bold mt-2">Dark contrast</p>
        </button>
        <div className="flex flex-col items-center mt-5">
          <TextResizer />
        </div>
      </div>
    </Modal>
  )
}

export default AccessibilityPopup
