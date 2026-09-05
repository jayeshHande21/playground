import styled from 'styled-components'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'

const headline = ['Imagine it.', 'Render it.']

const easeOut = [0.22, 1, 0.36, 1] as const

const contentVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

const headlineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const lineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0 } },
}

const lineInnerVariants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.6, ease: easeOut },
  },
}

const HeroContainer = styled.section`
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100svh;
  place-items: center;
  overflow: hidden;
  padding: var(--space-2xl) clamp(1.25rem, 5vw, 4.5rem);
  background:
    radial-gradient(ellipse 70% 55% at 18% 12%, #fbcfe8 0%, transparent 58%),
    radial-gradient(ellipse 60% 50% at 88% 18%, #fed7aa 0%, transparent 55%),
    radial-gradient(ellipse 55% 45% at 50% 100%, #fce7f3 0%, transparent 60%),
    #fff8f3;
  color: var(--color-foreground);
`

const Texture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image: radial-gradient(rgba(24, 24, 27, 0.16) 0.7px, transparent 0.8px);
  background-size: 4px 4px;
`

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(100%, 52rem);
  text-align: center;
`

const Eyebrow = styled(motion.p)`
  margin: 0 0 var(--space-lg);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
`

const Headline = styled(motion.h1)`
  color: var(--color-primary);
  font-size: clamp(3.6rem, 10vw, 7.5rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.04em;
`

const AccentLine = styled.span`
  color: #be185d;
`

const Line = styled(motion.span)`
  display: block;
  overflow: hidden;
`

const LineInner = styled(motion.span)`
  display: block;
`

const Lede = styled(motion.p)`
  max-width: 32ch;
  margin-top: var(--space-xl);
  font-size: 1.2rem;
  line-height: 1.55;
  color: var(--color-muted-foreground);
`

const Actions = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: var(--space-xl);
`

const PrimaryCta = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 52px;
  padding: 0.9rem 1.75rem;
  border-radius: 8px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  box-shadow: var(--shadow-md);
`

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <HeroContainer id="top">
      <Texture aria-hidden="true" />

      <HeroContent
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        variants={contentVariants}
      >
        <Eyebrow variants={reduceMotion ? undefined : itemVariants}>
          FotoOwl · AI Studio
        </Eyebrow>

        <Headline variants={reduceMotion ? undefined : headlineVariants}>
          {headline.map((text, index) => (
            <Line key={text} variants={reduceMotion ? undefined : lineVariants}>
              <LineInner variants={reduceMotion ? undefined : lineInnerVariants}>
                {index === 1 ? <AccentLine>{text}</AccentLine> : text}
              </LineInner>
            </Line>
          ))}
        </Headline>

        <Lede variants={reduceMotion ? undefined : itemVariants}>
          Turn a prompt into a finished visual — without leaving your event
          workflow.
        </Lede>

        <Actions variants={reduceMotion ? undefined : itemVariants}>
          <PrimaryCta
            id="studio"
            href="#studio"
            whileHover={
              reduceMotion
                ? undefined
                : { scale: 1.03, backgroundColor: '#db2777' }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Try AI Studio
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </PrimaryCta>
        </Actions>
      </HeroContent>
    </HeroContainer>
  )
}
