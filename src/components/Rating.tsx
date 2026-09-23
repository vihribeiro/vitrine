interface RatingProps {
  value: number
}

export function Rating({ value }: RatingProps) {
  const rounded = Math.round(value * 2) / 2

  return (
    <div className="flex items-center gap-1" aria-label={`Avaliação ${value.toFixed(1)} de 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rounded >= star
        const half = !filled && rounded >= star - 0.5
        return (
          <svg
            key={star}
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 text-amber-400"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.4l1.1-6.5L2.6 9.35l6.5-.95z" />
            {half && <path d="M12 2.5v15.4L6.2 20.4l1.1-6.5L2.6 9.35l6.5-.95z" fill="currentColor" stroke="none" />}
          </svg>
        )
      })}
      <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        {value.toFixed(1)}
      </span>
    </div>
  )
}
