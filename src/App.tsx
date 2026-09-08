import { lazy, Suspense } from 'react'
import HomePage from './features/playground/HomePage'
import LandingPage from './features/landing/LandingPage'

const PortfolioPage = lazy(() => import('./features/grapesjs/PortfolioPage'))

function App() {
  const path = window.location.pathname

  if (path.startsWith('/portfolio')) {
    return (
      <Suspense fallback={<div style={{ height: '100svh', background: '#1c1917' }} />}>
        <PortfolioPage />
      </Suspense>
    )
  }

  if (path.startsWith('/landing')) {
    return <LandingPage />
  }

  return <HomePage />
}

export default App
