import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          {/* reducedMotion="user" automatically shortens/disables Framer
              Motion animations for people with prefers-reduced-motion set,
              without needing to thread that check through every component. */}
          <MotionConfig reducedMotion="user">
            <AuthProvider>
              <App />
            </AuthProvider>
          </MotionConfig>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)

// Service worker registration - production builds only. Registering
// this during local development would mean every code change gets
// silently served from a stale cache instead of the fresh dev build,
// exactly the kind of confusing behavior that makes "why isn't my
// change showing up" a common service-worker complaint. Registered
// after the window's load event, not immediately, so it doesn't
// compete with the page's own initial resources for bandwidth/priority
// during the part of loading that actually matters to a first-time
// visitor.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Registration can fail for reasons outside this app's control
      // (browser policy, private browsing restrictions in some
      // browsers) - offline support is a genuine enhancement, not a
      // requirement, so a failure here shouldn't be surfaced as an
      // error to a visitor who never asked for it.
    })
  })
}
