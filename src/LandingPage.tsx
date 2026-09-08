import { MotionConfig } from 'motion/react'
import HeroSection from './components/HeroSection'
import StudioIntro from './components/StudioIntro'
import HowItWorks from './components/HowItWorks'
import AiEnhance from './components/AiEnhance'
import WorkflowClose from './components/WorkflowClose'
import PointerRing from './components/PointerRing'
import './home.css'

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#studio">
        Skip to try AI Studio
      </a>
      <div className="landing-back">
        <a className="back-home" href="/">
          Back to playground
        </a>
      </div>
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
