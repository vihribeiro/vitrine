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
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 px-6 py-10 text-white sm:px-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Catálogo de produtos</h1>
        <p className="mt-2 max-w-xl text-indigo-100">
          Busque por nome, filtre por categoria e abra a página de detalhes de cada produto.
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <CategorySelect categories={categories} value={category} onChange={setCategory} />
      </div>

      {loading && <ProductGridSkeleton count={PAGE_SIZE} />}

      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && !hasResults && (
        <EmptyState
          title="Nenhum produto encontrado"
          message="Tente outra busca ou selecione outra categoria."
        />
      )}

      {!loading && !error && hasResults && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
  )
}
