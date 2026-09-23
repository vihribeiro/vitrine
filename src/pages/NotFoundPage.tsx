import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <span className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">404</span>
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">Página não encontrada</h1>
      <p className="text-slate-500 dark:text-slate-400">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}
