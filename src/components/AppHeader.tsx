import React from 'react'
import { Link } from 'react-router-dom'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'
import { IoHomeSharp } from 'react-icons/io5'

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const linkResolver = useBoardSlugLinkResolver()

  return (
    <header className="flex w-full  items-center justify-between bg-brand-background dark:bg-brand-darkBackground p-[15px] md:p-[50px] dark:text-white">
      <a href="#content" className="sr-only focus:not-sr-only" tabIndex={0}>
        Skip to content
      </a>
      <Link
        to={linkResolver('')}
        className="flex items-center justify-between border text-black border-black dark:bg-transparent dark:text-white text-sm py-2 px-4 rounded-lg font-bold cursor-pointer dark:border dark:border-white"
      >
        <IoHomeSharp title="Home" className="mr-2" aria-hidden="true" />
        <span>Home</span>
      </Link>
      <nav className="flex space-x-[20px] md:space-x-[40px] items-center ">
        <Link to={linkResolver('/about')}>About</Link>
        <Link to={linkResolver('/faq')}>FAQ</Link>
      </nav>
    </header>
  )
}

export default AppHeader
