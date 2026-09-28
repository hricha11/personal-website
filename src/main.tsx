import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// for anyone who opens the console
console.log("%cthe fig tree is still here. I picked a few.", "font: 16px Caveat, cursive; color: #5F7355")

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
