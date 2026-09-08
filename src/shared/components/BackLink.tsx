import '../styles/back-link.css'

type BackLinkProps = {
  className?: string
}

export default function BackLink({ className }: BackLinkProps) {
  return (
    <div className={className}>
      <a className="back-home" href="/">
        Back to playground
      </a>
    </div>
  )
}
