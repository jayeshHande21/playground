import { lazy, Suspense } from 'react'
import HomePage from './HomePage'
import LandingPage from './LandingPage'

const PortfolioPage = lazy(() => import('./portfolio/PortfolioPage'))

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
