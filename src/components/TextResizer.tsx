import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

function changeRootFontSize(fontSizeChange: number) {
  const rootElement = document.querySelector(':root') as HTMLElement | null
  if (rootElement) {
    const fontSize = rootElement.style.fontSize || '16px'
    const sizeValue = parseInt(fontSize.split('px')[0])
    if (!isNaN(sizeValue)) {
      rootElement.style.fontSize = `${sizeValue + fontSizeChange}px`
    }
  }
}

interface TextResizerProps {}

const TextResizer: React.FC<TextResizerProps> = () => {
  return (
    <div className="flex items-center bg-white py-[6px] px-[6px] rounded-full border-[1px] border-brand-dark">
      <button
        className="mr-[18px] ml-[8px] active:font-bold"
        onClick={() => changeRootFontSize(-2)}
        aria-label="Decrease font size"
        data-cy="decrease-font-size"
      >
        <FiMinus title="Decrease font size" />
      </button>
      <div className="whitespace-nowrap">Text size</div>
      <button
        className="ml-[18px] mr-[8px] active:font-bold"
        onClick={() => changeRootFontSize(2)}
        aria-label="Increase font size"
        data-cy="increase-font-size"
      >
        <FiPlus title="Increase font size" />
      </button>
    </div>
  )
}

export default TextResizer
