import { motion } from 'motion/react'
import { ArrowRight, Play } from '@phosphor-icons/react'
import { templates, type TemplateId } from '../content'
import { TemplateFrame } from './TemplateFrame'

const easeOut = [0.22, 1, 0.36, 1] as const

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

const headlines = ['Pick a template.', 'Generate the look.', 'Keep the portrait.']

type HeroProps = {
  templateId: TemplateId
}

export function Hero({ templateId }: HeroProps) {
  const active = templates.find((item) => item.id === templateId) ?? templates[0]
  const extras = templates.filter((item) => item.id !== templateId).slice(0, 2)

  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <motion.p
          className="eyebrow"
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, ease: easeOut }}
        >
          FotoOwl · AI Generation
        </motion.p>
        <h1 className="hero__title">
          {headlines.map((text, index) => (
            <span className="hero__line" key={text}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.55, ease: easeOut, delay: 0.12 + index * 0.12 }}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero__lede"
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.45, ease: easeOut, delay: 0.5 }}
        >
          Guests take one event photo, choose a FotoOwl template, and generate an
          AI portrait that lands in the same gallery they already use to find
          their pictures.
        </motion.p>
        <motion.div
          className="hero__actions"
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.45, ease: easeOut, delay: 0.6 }}
        >
          <a className="btn btn-accent" href="#generate">
            Generate a portrait
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <a className="btn btn-ghost" href="#features">
            <Play size={16} weight="fill" aria-hidden="true" />
            See how it works
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__stage"
        variants={fade}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.5, ease: easeOut, delay: 0.28 }}
        aria-hidden="true"
      >
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <TemplateFrame
            id={active.id}
            name={active.name}
            caption={active.use}
            size="hero"
            active
          />
        </motion.div>
        <div className="hero__stack">
          {extras.map((item) => (
            <TemplateFrame key={item.id} id={item.id} name={item.name} size="hero" />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
