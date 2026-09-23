interface EmptyStateProps {
  title: string
  message: string
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 border border-line px-6 py-24 text-center">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Sem resultados</span>
      <strong className="font-display text-2xl font-light tracking-[-0.02em]">{title}</strong>
      <span className="max-w-sm text-[13px] text-muted">{message}</span>
    </div>
  )
}

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 border border-line px-6 py-24 text-center">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Erro</span>
      <span className="max-w-sm text-[13px]">{message}</span>
      <button
        type="button"
        onClick={onRetry}
        className="border border-ink px-5 py-2 text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
      >
        Tentar novamente
      </button>
    </div>
  )
}
