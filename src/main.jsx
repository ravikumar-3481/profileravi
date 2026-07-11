import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './styles/style2.css'
import './styles/style1.css'
import './styles/project.css'
import './styles/timeseries.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
