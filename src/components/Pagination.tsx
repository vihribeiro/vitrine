interface PaginationProps {
  page: number
  totalPages: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, total, pageSize, onChange }: PaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <nav className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-[10px] uppercase tracking-[0.16em] text-muted sm:flex-row">
      <span className="tabular-nums">
        {from}–{to} de {total}
      </span>

      <div className="flex items-center gap-7">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Anterior
        </button>
        <span className="tabular-nums text-ink">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className="transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          Próxima →
        </button>
      </div>
    </nav>
  )
}
