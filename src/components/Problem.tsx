import { motion } from 'motion/react'

const easeOut = [0.22, 1, 0.36, 1] as const

export function Problem() {
  return (
    <section className="problem" id="problem">
      <motion.div
        className="problem__inner"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <p className="eyebrow">The gap</p>
        <blockquote className="problem__quote">
          A 400-guest wedding cannot wait for 400 retouched looks.
        </blockquote>
        <p className="problem__body">
          Guests want a portrait that feels like them, in a style they chose.
          Photographers need that to happen in the gallery — not in Photoshop
          overnight. AI Generation is the template studio inside FotoOwl.
        </p>
      </motion.div>
    </section>
  )
}
