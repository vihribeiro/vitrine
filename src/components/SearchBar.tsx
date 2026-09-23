interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex w-full items-center gap-3 border-b border-line pb-2 transition-colors focus-within:border-ink sm:max-w-xs">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar produtos"
        aria-label="Buscar produtos"
        className="w-full bg-transparent text-[13px] tracking-[-0.01em] outline-none"
      />
    </label>
  )
}
