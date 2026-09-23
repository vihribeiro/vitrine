export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
        <span>
          Vitrine · catálogo de exemplo consumindo a API pública DummyJSON
        </span>
        <span>
          por{' '}
          <a
            href="https://viniciusribeiro.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Vinicius Ribeiro
          </a>
        </span>
      </div>
    </footer>
  )
}
