import type { TemplateId } from '../content'

type TemplateFrameProps = {
  id: TemplateId
  name: string
  caption?: string
  size?: 'hero' | 'picker'
  active?: boolean
}

export function TemplateFrame({
  id,
  name,
  caption,
  size = 'hero',
  active = false,
}: TemplateFrameProps) {
  return (
    <figure className={`frame frame--${id} frame--${size}${active ? ' is-active' : ''}`}>
      <div className="frame__stage" aria-hidden="true">
        <span className="frame__grain" />
        <span className="portrait">
          <span className="portrait__light" />
          <span className="portrait__head" />
          <span className="portrait__torso" />
        </span>
      </div>
      <figcaption className="frame__cap">
        <span className="frame__name">{name}</span>
        {caption ? <span className="frame__use">{caption}</span> : null}
      </figcaption>
    </figure>
  )
}
