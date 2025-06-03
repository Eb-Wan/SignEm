import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'linearicons/dist/web-font/style.css'

import "./tarteaucitronConfig.js"

createRoot(document.querySelector("body")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
