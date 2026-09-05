import { motion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'

const easeOut = [0.22, 1, 0.36, 1] as const

export function Cta() {
  return (
    <section className="cta" id="generate">
      <motion.div
        className="cta__panel"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <p className="eyebrow eyebrow--on-dark">Put it on the next event</p>
        <h2>Enable AI Generation. Let every guest leave with a portrait they made.</h2>
        <p>
          Photographers turn on templates. Guests generate from one photo. The
          gallery keeps the file, the brand, and the share.
        </p>
        <div className="cta__actions">
          <a className="btn btn-accent" href="https://fotoowl.ai/" target="_blank" rel="noreferrer">
            Start on FotoOwl
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <a className="btn btn-ghost-dark" href="https://fotoowl.ai/pricing" target="_blank" rel="noreferrer">
            View plans
          </a>
        </div>
      </motion.div>
    </section>
  )
}
