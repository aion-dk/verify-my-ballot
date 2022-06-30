import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextResizer from './TextResizer'
import ContrastPicker from './ContrastPicker'
import icon from '../assets/accessibility-man.png'
import AccessibilityPopup from './AccessibilityPopup'
import { TbAccessible } from 'react-icons/tb'

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const [modal, setModal] = useState(false)

  return (
    <header className="flex w-full  items-center justify-between bg-brand-background dark:bg-brand-darkBackground p-[15px] md:p-[50px] dark:text-white">
      <Link to="/">Logo</Link>
      <nav className="flex space-x-[20px] md:space-x-[40px] items-center ">
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
    </header>
  )
}

export default AppHeader
