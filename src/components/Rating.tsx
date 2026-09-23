interface RatingProps {
  value: number
}

export function Rating({ value }: RatingProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted"
      aria-label={`Avaliação ${value.toFixed(1)} de 5`}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.4l1.1-6.5L2.6 9.35l6.5-.95z" />
      </svg>
      {value.toFixed(1)}
    </span>
  )
}
