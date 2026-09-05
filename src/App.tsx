import { MotionConfig } from 'motion/react'
import HeroSection from './components/HeroSection'
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
      </main>
    </MotionConfig>
  )
}

export default App
