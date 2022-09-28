import React, { useEffect } from 'react'
import AppRouter from './AppRouter'
import config from './config/config.json'
import './i18n'

const App: React.FC = () => {
  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement
    root.style.setProperty('--color_01', config.colors.sliderBlue)
  }, [])

  return (
    <div id="root">
      <AppRouter />
    </div>
  )
}

export default App
