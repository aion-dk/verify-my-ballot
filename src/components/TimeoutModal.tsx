import React from 'react'
import { formatTimeoutDuration } from '../utils'
import Modal from 'react-modal'

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
  body: {}
  onClose: () => void
}

const TimeoutModal: React.FC<TimeoutModalProps> = ({
  timeout,
  isOpen,
  onClose,
  body
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Timeout reminder pop up"
      style={customStyles}
    >
      <div className="flex justify-center items-center" data-cy="timeout-modal">
        <div className="w-[90%] md:w-[600px] h-[500px] bg-white dark:bg-brand-darkBackground shadow-2xl rounded-[20px] flex flex-col items-center justify-center gap-[40px] px-[10px]">
          <p className="page-content w-[60%] dark:text-white">
            {body}
          </p>
          <p
            className="text-brand-dark text-xl font-bold text-center md:text-2xl dark:text-white"
            data-cy="timeout-modal-timeleft"
          >
            Time left: {formatTimeoutDuration(timeout)}
          </p>
          <p>
            <button className="button" type="button" onClick={() => {onClose()} }>Close</button>
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default TimeoutModal
