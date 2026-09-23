export function Spinner({ label = 'Carregando' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-24" role="status">
      <span className="h-3 w-3 animate-spin rounded-full border border-ink border-t-transparent" />
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted">{label}</span>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/5] bg-paper-2" />
          <div className="mt-3 space-y-2">
            <div className="h-2 w-1/3 bg-paper-2" />
            <div className="h-3 w-4/5 bg-paper-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
