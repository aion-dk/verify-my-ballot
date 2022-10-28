import React from 'react'
import { formatTimeoutDuration } from '../utils'
import Modal from 'react-modal'
import { useTranslation } from 'react-i18next'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    overflow: 'initial',
    border: 'none',
    background: 'none',
  },
}

interface TimeoutModalProps {
  timeout: number
  isOpen: boolean
  body: React.ReactNode
  onClose: () => void
}

const TimeoutModal: React.FC<TimeoutModalProps> = ({
  timeout,
  isOpen,
  onClose,
  body,
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={t('timeout-modal.label')}
      style={customStyles}
    >
      <div className="flex justify-center items-center" data-cy="timeout-modal">
        <div className="w-[90%] md:w-[600px] h-[500px] bg-white dark:bg-brand-darkBackground shadow-2xl rounded-[20px] flex flex-col items-center justify-center gap-[40px] px-[10px]">
          <div className="page-content w-[60%] dark:text-white">{body}</div>
          <p
            className="text-brand-dark text-xl font-bold text-center md:text-2xl dark:text-white"
            data-cy="timeout-modal-timeleft"
          >
            {t('timeout-modal.time-left', {
              timeLeft: formatTimeoutDuration(timeout),
            })}
          </p>
          <button
            className="button"
            type="button"
            onClick={() => {
              onClose()
            }}
          >
            {t('timeout-modal.close-button')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default TimeoutModal
