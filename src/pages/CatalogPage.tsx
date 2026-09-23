import { useEffect, useState } from 'react'
import { CategorySelect } from '../components/CategorySelect'
import { Pagination } from '../components/Pagination'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { ProductGridSkeleton } from '../components/Spinner'
import { EmptyState, ErrorState } from '../components/States'
import { useCategories } from '../hooks/useCategories'
import { useDebounce } from '../hooks/useDebounce'
import { useProducts } from '../hooks/useProducts'

const PAGE_SIZE = 8

export function CatalogPage() {
  const [searchInput, setSearchInput] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)

  const search = useDebounce(searchInput, 400)
  const categories = useCategories()
  const { data, loading, error, reload } = useProducts({
    search,
    category,
    page,
    pageSize: PAGE_SIZE,
  })

  useEffect(() => {
    setPage(1)
  }, [search, category])

  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const hasResults = Boolean(data && data.items.length > 0)

  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1500px] px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12">
          <p className="mb-8 text-[10px] uppercase tracking-[0.22em] text-muted">
            Catálogo {total > 0 && `· ${total} produtos`}
          </p>
          <h1 className="max-w-[14ch] font-display text-[clamp(3.2rem,11vw,8.5rem)] font-light leading-[0.9] tracking-[-0.045em]">
            Seleção de objetos
          </h1>
          <p className="mt-8 max-w-sm text-[13px] leading-relaxed text-muted">
            Uma curadoria de produtos variados. Busque pelo nome, filtre por categoria e abra os
            detalhes de cada peça.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 border-b border-line py-6 sm:flex-row sm:items-end sm:justify-between">
          <SearchBar value={searchInput} onChange={setSearchInput} />
          <CategorySelect categories={categories} value={category} onChange={setCategory} />
        </div>

        <div className="py-10">
          {loading && <ProductGridSkeleton count={PAGE_SIZE} />}

          {!loading && error && <ErrorState message={error} onRetry={reload} />}

          {!loading && !error && !hasResults && (
            <EmptyState
              title="Nada por aqui"
              message="Tente outra busca ou selecione outra categoria."
            />
          )}

          {!loading && !error && hasResults && (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {data!.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                total={total}
                pageSize={PAGE_SIZE}
                onChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
