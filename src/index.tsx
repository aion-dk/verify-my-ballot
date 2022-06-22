import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { STRICT_MODE } from './constants'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

if (STRICT_MODE) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  root.render(<App />)
}
