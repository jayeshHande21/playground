import { useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import GenerateStepsPlayer from './GenerateStepsPlayer'

const steps = [
  {
    number: '01',
    title: 'Select a photo',
    copy: 'Pick a frame from the event gallery.',
    look: 'Event',
    src: '/ai-generate/before-couple.jpg',
    position: 'center 12%',
    tilt: -2.4,
  },
  {
    number: '02',
    title: 'Choose a template',
    copy: 'Open AI Studio and pick the look you want.',
    look: 'Template',
    src: '/ai-generate/template-watercolor.jpg',
    position: 'center top',
    tilt: 2.2,
  },
  {
    number: '03',
    title: 'Preview the result',
    copy: 'The generated image matches that template.',
    look: 'Preview',
    src: '/ai-generate/template-watercolor.jpg',
    position: 'center top',
    tilt: -1.6,
  },
]

const easeOut = [0.22, 1, 0.36, 1] as const

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6.5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: var(--color-cream);
  color: var(--color-foreground);
`

const ParallaxWash = styled(motion.div)`
  position: absolute;
  width: min(34rem, 70vw);
  height: min(34rem, 70vw);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--color-gold-wash) 0%,
    transparent 68%
  );
  pointer-events: none;
  will-change: transform;
`

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 76rem;
  margin: 0 auto;
`

const Panel = styled.div`
  display: grid;
  gap: 1.75rem;
  padding: clamp(1.35rem, 3vw, 1.85rem);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: var(--color-card);
  box-shadow: var(--shadow-md);

  @media (min-width: 960px) {
    grid-template-columns: minmax(20rem, 28rem) minmax(0, 1fr);
    align-items: center;
    gap: 2.25rem;
    padding: 1.75rem 1.75rem 1.75rem 2rem;
  }
`

const Copy = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const Eyebrow = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-dark);
`

const Title = styled.h2`
  margin: 0;
  max-width: 11ch;
  font-size: clamp(1.85rem, 3.2vw, 2.55rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.12;
`

const Lede = styled.p`
  max-width: 36ch;
  margin: 0.65rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.95rem;
  line-height: 1.5;
`

const TimelineWrap = styled.div`
  position: relative;
  margin-top: 1.15rem;
  padding-left: 1.15rem;
`

const Timeline = styled(motion.ol)`
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Rail = styled.div`
  position: absolute;
  top: 1.15rem;
  bottom: 1.15rem;
  left: 0.22rem;
  width: 0;
  border-left: 1.5px dashed color-mix(in srgb, var(--color-accent) 72%, var(--color-border));
`

const StepCard = styled(motion.button)<{ $active: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3.35rem;
  gap: 0.7rem;
  align-items: center;
  width: 100%;
  padding: 0.7rem 0.75rem;
  border: 1px solid
    ${(props) =>
      props.$active ? 'var(--color-accent)' : 'var(--color-border)'};
  border-radius: 14px;
  background: ${(props) =>
    props.$active
      ? 'color-mix(in srgb, var(--color-cream) 88%, var(--color-card))'
      : 'var(--color-card)'};
  box-shadow: ${(props) =>
    props.$active ? 'var(--shadow-md)' : 'var(--shadow-sm)'};
  color: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 3px;
  }
`

const Node = styled.span<{ $active: boolean }>`
  position: absolute;
  top: 50%;
  left: -1.12rem;
  width: 0.6rem;
  height: 0.6rem;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  background: ${(props) =>
    props.$active ? 'var(--color-accent)' : 'var(--color-card)'};
  box-shadow: ${(props) =>
    props.$active ? '0 0 0 3px color-mix(in srgb, var(--color-accent) 28%, transparent)' : 'none'};
  transform: translateY(-50%);
`

const StepHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

const StepNumber = styled.p`
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--color-accent-dark);
`

const StepTitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`

const StepCopy = styled.p`
  margin: 0.2rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.8125rem;
  line-height: 1.4;
`

const LookImage = styled.img<{ $position?: string }>`
  display: block;
  width: 3.35rem;
  height: 3.35rem;
  object-fit: cover;
  object-position: ${(props) => props.$position ?? 'center'};
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-muted);
`

const LookLabel = styled.span`
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 72%, transparent);
  color: var(--color-on-primary);
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const Look = styled.span`
  position: relative;
  display: block;
`

const Actions = styled(motion.div)`
  margin-top: 1.15rem;
`

const Cta = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.65rem 1.35rem;
  border-radius: 999px;
  background: var(--color-action);
  color: var(--color-on-action);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 12px 24px color-mix(in srgb, var(--color-action) 28%, transparent);

  &:hover {
    background: color-mix(in srgb, var(--color-action) 82%, var(--color-primary));
  }
`

const VideoCol = styled(motion.div)`
  min-width: 0;

  @media (min-width: 960px) {
    position: sticky;
    top: 5.5rem;
  }
`

const introVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

const itemVariants = {
  hidden: (tilt: number) => ({ opacity: 0, y: 28, rotate: tilt * 1.6 }),
  show: (tilt: number) => ({
    opacity: 1,
    y: 0,
    rotate: tilt,
    transition: { duration: 0.5, ease: easeOut },
  }),
}

export default function HowItWorks() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const washY = useTransform(scrollYProgress, [0, 1], [48, -64])
  const washYSlow = useTransform(scrollYProgress, [0, 1], [24, -36])

  return (
    <Section id="how-it-works" ref={sectionRef}>
      <ParallaxWash
        aria-hidden="true"
        style={
          reduceMotion
            ? { top: '-12%', right: '-8%' }
            : { top: '-12%', right: '-8%', y: washY }
        }
      />
      <ParallaxWash
        aria-hidden="true"
        style={
          reduceMotion
            ? { bottom: '-18%', left: '-12%', opacity: 0.7 }
            : { bottom: '-18%', left: '-12%', opacity: 0.7, y: washYSlow }
        }
      />

      <Inner>
        <Panel>
          <Copy
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={reduceMotion ? undefined : introVariants}
          >
            <Eyebrow>AI Generate</Eyebrow>
            <Title>Pick a look. Preview it.</Title>
            <Lede>
              Select a photo in the event, click Generate, then choose a
              template. The preview matches that look.
            </Lede>

            <TimelineWrap>
              <Rail aria-hidden="true" />
              <Timeline
                initial={reduceMotion ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.28 }}
                variants={reduceMotion ? undefined : listVariants}
              >
              {steps.map((step, index) => {
                const active = activeStep === index
                return (
                  <motion.li
                    key={step.number}
                    custom={reduceMotion ? 0 : step.tilt}
                    variants={reduceMotion ? undefined : itemVariants}
                    style={{ listStyle: 'none' }}
                  >
                    <StepCard
                      type="button"
                      $active={active}
                      aria-pressed={active}
                      data-cursor="action"
                      onClick={() => setActiveStep(index)}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -2, rotate: 0, scale: 1.01 }
                      }
                      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                    >
                      <Node $active={active} />
                      <div>
                        <StepHead>
                          <StepNumber>{step.number}</StepNumber>
                          <StepTitle>{step.title}</StepTitle>
                        </StepHead>
                        <StepCopy>{step.copy}</StepCopy>
                      </div>
                      <Look>
                        <LookImage
                          src={step.src}
                          alt=""
                          $position={step.position}
                        />
                        <LookLabel>{step.look}</LookLabel>
                      </Look>
                    </StepCard>
                  </motion.li>
                )
              })}
              </Timeline>
            </TimelineWrap>

            <Actions
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <Cta
                href="#studio"
                data-cursor="action"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Start Creating
              </Cta>
            </Actions>
          </Copy>

          <VideoCol
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.06 }}
          >
            <GenerateStepsPlayer />
          </VideoCol>
        </Panel>
      </Inner>
    </Section>
  )
}
