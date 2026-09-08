import { features } from './features'
import './home.css'

export default function HomePage() {
  return (
    <main className="home">
      <div className="home__inner">
        <h1 className="home__title">Playground</h1>
        <p className="home__lead">Pick a feature to open it.</p>
        <div className="home-cards">
          {features.map((feature) => (
            <a key={feature.path} className="home-card" href={feature.path}>
              <span className="home-card__name">{feature.label}</span>
              <span className="home-card__info">{feature.description}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
