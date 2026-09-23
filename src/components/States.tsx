interface EmptyStateProps {
  title: string
  message: string
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
      <svg viewBox="0 0 24 24" className="mb-2 h-8 w-8 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <strong className="text-slate-800 dark:text-slate-100">{title}</strong>
      <span className="text-sm text-slate-500 dark:text-slate-400">{message}</span>
    </div>
  )
}

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 py-16 text-center dark:border-rose-900/60 dark:bg-rose-950/40">
      <span className="text-slate-800 dark:text-slate-100">{message}</span>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
      >
        Tentar novamente
      </button>
    </div>
  )
}
