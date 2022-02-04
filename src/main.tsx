import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from './Router'
import './index.css'
import { AppProvider } from './context/AppContext'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
