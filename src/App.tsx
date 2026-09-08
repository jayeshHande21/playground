import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import HeroSection from './components/HeroSection'
import StudioIntro from './components/StudioIntro'
import HowItWorks from './components/HowItWorks'
import AiEnhance from './components/AiEnhance'
import WorkflowClose from './components/WorkflowClose'
import PointerRing from './components/PointerRing'

const PortfolioPage = lazy(() => import('./portfolio/PortfolioPage'))

function Landing() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#studio">
        Skip to try AI Studio
      </a>
      <PointerRing />
      <main>
        <HeroSection />
        <HowItWorks />
        <AiEnhance />
        <WorkflowClose />
        <StudioIntro />
      </main>
    </MotionConfig>
  )
}

function App() {
  if (window.location.pathname.startsWith('/portfolio')) {
    return (
      <Suspense fallback={<div style={{ height: '100svh', background: '#1c1917' }} />}>
        <PortfolioPage />
      </Suspense>
    )
  }

  return <Landing />
}

export default App
