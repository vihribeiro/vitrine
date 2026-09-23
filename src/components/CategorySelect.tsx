import type { Category } from '../types/product'

interface CategorySelectProps {
  categories: Category[]
  value: string
  onChange: (value: string) => void
}

export function CategorySelect({ categories, value, onChange }: CategorySelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filtrar por categoria"
      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      <option value="">Todas as categorias</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  )
}
