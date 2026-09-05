import { useEffect, useId, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CaretLeft, CaretRight, Pause, Play } from '@phosphor-icons/react'
import { testimonials } from '../content'

export function Testimonials() {
  const reduceMotion = useReducedMotion()
  const labelId = useId()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = testimonials[index]

  useEffect(() => {
    if (reduceMotion || paused) return
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  const go = (next: number) => {
    const length = testimonials.length
    setIndex(((next % length) + length) % length)
  }

  return (
    <section className="proof" id="proof">
      <div className="proof__intro">
        <p className="eyebrow">Social proof</p>
        <h2 id={labelId}>Photographers already run the gallery. Generation sits on top.</h2>
      </div>

      <div
        className="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(false)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            go(index - 1)
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            go(index + 1)
          }
        }}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Testimonial {index + 1} of {testimonials.length}. {current.role}, {current.place}.
        </p>

        <figure
          className="quote"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${testimonials.length}`}
        >
          <blockquote>{current.quote}</blockquote>
          <figcaption>
            <span className="quote__role">{current.role}</span>
            <span className="quote__place">{current.place}</span>
          </figcaption>
        </figure>

        <div className="carousel__controls">
          <button type="button" className="icon-btn" onClick={() => go(index - 1)}>
            <CaretLeft size={20} weight="bold" aria-hidden="true" />
            <span className="sr-only">Previous testimonial</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused || Boolean(reduceMotion)}
          >
            {paused || reduceMotion ? (
              <Play size={18} weight="fill" aria-hidden="true" />
            ) : (
              <Pause size={18} weight="fill" aria-hidden="true" />
            )}
            <span className="sr-only">
              {paused || reduceMotion ? 'Play testimonials' : 'Pause testimonials'}
            </span>
          </button>
          <button type="button" className="icon-btn" onClick={() => go(index + 1)}>
            <CaretRight size={20} weight="bold" aria-hidden="true" />
            <span className="sr-only">Next testimonial</span>
          </button>
        </div>
      </div>

      <motion.p
        className="proof__stat"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Trusted by 75,000+ businesses on FotoOwl — the same delivery layer AI
        Generation uses.
      </motion.p>
    </section>
  )
}
