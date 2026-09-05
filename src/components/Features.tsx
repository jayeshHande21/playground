import { motion } from 'motion/react'
import { Camera, DownloadSimple, GridFour, Image } from '@phosphor-icons/react'
import { features, templates, type TemplateId } from '../content'
import { TemplateFrame } from './TemplateFrame'

const icons = [GridFour, Camera, Image, DownloadSimple] as const

const list = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, bounce: 0.32, duration: 0.45 },
  },
}

type FeaturesProps = {
  templateId: TemplateId
  onSelect: (id: TemplateId) => void
}

export function Features({ templateId, onSelect }: FeaturesProps) {
  return (
    <section className="features" id="features">
      <div className="features__intro">
        <p className="eyebrow">How it works</p>
        <h2>From template to gallery portrait</h2>
        <p className="features__lede">
          Four steps. The photographer enables looks. The guest generates.
          The event link stays the source of truth.
        </p>
      </div>

      <motion.ol
        className="feature-list"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {features.map((feature, index) => {
          const Icon = icons[index]
          return (
            <motion.li className="feature" key={feature.id} variants={item}>
              <span className="feature__index">{String(index + 1).padStart(2, '0')}</span>
              <Icon className="feature__icon" size={22} weight="regular" aria-hidden="true" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </motion.li>
          )
        })}
      </motion.ol>

      <div className="templates" id="templates">
        <div className="templates__head">
          <h3>Templates guests can generate from</h3>
          <p>Select a look. The stage updates to that lighting and grade.</p>
        </div>
        <div className="templates__grid" role="list">
          {templates.map((template) => (
            <button
              type="button"
              role="listitem"
              key={template.id}
              className={`template-btn${template.id === templateId ? ' is-active' : ''}`}
              onClick={() => onSelect(template.id)}
              aria-pressed={template.id === templateId}
            >
              <TemplateFrame
                id={template.id}
                name={template.name}
                caption={template.use}
                size="picker"
                active={template.id === templateId}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
