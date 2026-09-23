import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../lib/api'
import type { Paginated, Product } from '../types/product'

interface UseProductsParams {
  search: string
  category: string
  page: number
  pageSize: number
}

export function useProducts({ search, category, page, pageSize }: UseProductsParams) {
  const [data, setData] = useState<Paginated<Product> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    getProducts({
      search: search || undefined,
      category: category || undefined,
      page,
      pageSize,
      signal: controller.signal,
    })
      .then((result) => setData(result))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Erro inesperado.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [search, category, page, pageSize, reloadKey])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  return { data, loading, error, reload }
}
