import type { Category, Paginated, Product } from '../types/product'

const API_BASE = 'https://dummyjson.com'

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }
    throw new ApiError('Não foi possível conectar. Verifique sua internet.')
  }

  if (!response.ok) {
    throw new ApiError(`Falha ao carregar os dados (${response.status}).`, response.status)
  }

  return (await response.json()) as T
}

export interface ProductQuery {
  search?: string
  category?: string
  page: number
  pageSize: number
  signal?: AbortSignal
}

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export async function getProducts(query: ProductQuery): Promise<Paginated<Product>> {
  const { search, category, page, pageSize, signal } = query
  const skip = (page - 1) * pageSize

  let path = '/products'
  if (search) {
    path = '/products/search'
  } else if (category) {
    path = `/products/category/${encodeURIComponent(category)}`
  }

  const url = new URL(API_BASE + path)
  url.searchParams.set('limit', String(pageSize))
  url.searchParams.set('skip', String(skip))
  if (search) {
    url.searchParams.set('q', search)
  }

  const data = await fetchJson<ProductsResponse>(url.toString(), signal)

  return { items: data.products, total: data.total, skip: data.skip, limit: data.limit }
}

export function getProduct(id: string | number, signal?: AbortSignal): Promise<Product> {
  return fetchJson<Product>(`${API_BASE}/products/${id}`, signal)
}

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return fetchJson<Category[]>(`${API_BASE}/products/categories`, signal)
}
