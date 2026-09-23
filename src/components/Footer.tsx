export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-5 py-8 text-[10px] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span>Vitrine — catálogo via API DummyJSON</span>
        <span>
          por{' '}
          <a
            href="https://viniciusribeiro.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline-offset-4 hover:underline"
          >
            Vinicius Ribeiro
          </a>
        </span>
      </div>
    </footer>
  )
}
