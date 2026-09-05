import { MotionConfig } from 'motion/react'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#studio">
        Skip to try AI Studio
      </a>
      <main>
        <HeroSection />
      </main>
    </MotionConfig>
  )
}

export default App
