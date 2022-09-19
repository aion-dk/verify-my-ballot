import React from 'react'
import { Link } from 'react-router-dom'
import useBoardSlugLinkResolver from '../hooks/useBoardSlugLinkProvider'

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const linkResolver = useBoardSlugLinkResolver()

  return (
    <header className="flex w-full  items-center justify-between bg-brand-background dark:bg-brand-darkBackground p-[15px] md:p-[50px] dark:text-white">
      <Link to={linkResolver('')}>Logo</Link>
      <nav className="flex space-x-[20px] md:space-x-[40px] items-center ">
        <Link to={linkResolver('/about')}>About</Link>
        <Link to={linkResolver('/faq')}>FAQ</Link>
      </nav>
    </header>
  )
}

export default AppHeader
