import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { worker } from 'api/mocks/handlers.ts'
import './index.scss'

worker.start()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
