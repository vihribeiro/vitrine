import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
    >
      <span className="grid h-3 w-3 place-items-center">
        <span
          className={`h-3 w-3 border border-current transition-colors ${
            isDark ? 'bg-transparent' : 'bg-ink'
          }`}
        />
      </span>
      <span className="hidden sm:inline">{isDark ? 'Claro' : 'Escuro'}</span>
    </button>
  )
}
