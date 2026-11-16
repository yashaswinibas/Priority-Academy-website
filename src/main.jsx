import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

// single-file build (works anywhere, even by double-click) uses #/page links
const Router = import.meta.env.VITE_SINGLE ? HashRouter : BrowserRouter
import { LangProvider } from './lib/lang'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <LangProvider>
        <App />
      </LangProvider>
    </Router>
  </React.StrictMode>
)
