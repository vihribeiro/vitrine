import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link to="/" className="text-[13px] font-medium uppercase tracking-[-0.02em]">
          Vitrine<span className="align-super text-[8px]">®</span>
        </Link>

        <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.18em] text-muted sm:flex">
          <Link to="/" className="transition-colors hover:text-ink">
            Catálogo
          </Link>
          <a
            href="https://viniciusribeiro.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Portfólio
          </a>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
