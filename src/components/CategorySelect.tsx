import type { Category } from '../types/product'

interface CategorySelectProps {
  categories: Category[]
  value: string
  onChange: (value: string) => void
}

export function CategorySelect({ categories, value, onChange }: CategorySelectProps) {
  return (
    <label className="relative flex items-center gap-3 border-b border-line pb-2 transition-colors focus-within:border-ink">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Filtrar por categoria"
        className="cursor-pointer bg-transparent pr-5 text-[11px] uppercase tracking-[0.16em] outline-none"
      >
        <option value="">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  )
}
