import React from 'react'
import { Link } from 'react-router-dom'
import TextResizer from './TextResizer'

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <header className="flex w-full  items-center justify-between bg-brand-background p-[15px] md:p-[50px]">
      <Link to="/">(Insert customer logo)</Link>
      <nav className="flex space-x-[20px] md:space-x-[40px] items-center">
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <TextResizer />
      </nav>
    </header>
  )
}

export default AppHeader
