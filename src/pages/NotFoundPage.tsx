import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-6 px-5 py-28 sm:px-8 lg:px-12">
      <span className="text-[10px] uppercase tracking-[0.22em] text-muted">Erro 404</span>
      <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-light leading-[0.9] tracking-[-0.045em]">
        Página não
        <br />
        encontrada
      </h1>
      <p className="max-w-sm text-[13px] text-muted">
        O endereço acessado não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="mt-2 border border-ink px-6 py-3 text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}
