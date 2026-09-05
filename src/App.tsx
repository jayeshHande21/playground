import { MotionConfig } from 'motion/react'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import PointerRing from './components/PointerRing'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#studio">
        Skip to try AI Studio
      </a>
      <PointerRing />
      <main>
        <HeroSection />
        <HowItWorks />
      </main>
    </MotionConfig>
  )
}

export default App
