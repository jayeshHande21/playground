import { useState } from 'react'
import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Features } from './components/Features'
import { Testimonials } from './components/Testimonials'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import type { TemplateId } from './content'
import './App.css'

function App() {
  const [templateId, setTemplateId] = useState<TemplateId>('royal')

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#features">
        Skip to how it works
      </a>
      <Header />
      <main>
        <Hero templateId={templateId} />
        <Problem />
        <Features templateId={templateId} onSelect={setTemplateId} />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default App
