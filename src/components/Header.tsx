import { ArrowRight } from '@phosphor-icons/react'

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top">
        <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="14.2" />
          <ellipse className="brand__eye" cx="11.6" cy="14" rx="2.4" ry="2.7" />
          <ellipse className="brand__eye" cx="20.4" cy="14" rx="2.4" ry="2.7" />
          <path d="M12.2 21.2c1.3 1.3 6.3 1.3 7.6 0" />
        </svg>
        <span className="brand__name">FotoOwl</span>
        <span className="brand__product">AI Generation</span>
      </a>
      <nav className="nav" aria-label="Page">
        <a href="#problem">Why</a>
        <a href="#features">How</a>
        <a href="#proof">Proof</a>
      </nav>
      <a className="btn btn-primary header-cta" href="#generate">
        <span className="header-cta__full">Generate a portrait</span>
        <span className="header-cta__short">Generate</span>
        <ArrowRight size={18} weight="bold" aria-hidden="true" />
      </a>
    </header>
  )
}
