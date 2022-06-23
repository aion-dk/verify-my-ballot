import React from 'react'
import { Link } from 'react-router-dom'
import TextResizer from './TextResizer'
import ContrastPicker from './ContrastPicker'

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <header className="flex w-full  items-center justify-between bg-brand-background dark:bg-brand-darkBackground p-[15px] md:p-[50px] dark:text-white">
      <Link to="/">(Insert customer logo)</Link>
      <nav className="flex space-x-[20px] md:space-x-[40px] items-center ">
        <ContrastPicker />
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <TextResizer />
      </nav>
    </header>
  )
}

export default AppHeader
