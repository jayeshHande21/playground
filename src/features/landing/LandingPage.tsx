import { MotionConfig } from 'motion/react'
import BackLink from '../../shared/components/BackLink'
import HeroSection from './components/HeroSection'
import StudioIntro from './components/StudioIntro'
import HowItWorks from './components/HowItWorks'
import AiEnhance from './components/AiEnhance'
import WorkflowClose from './components/WorkflowClose'
import PointerRing from './components/PointerRing'
import './landing.css'

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#studio">
        Skip to try AI Studio
      </a>
      <BackLink className="landing-back" />
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
