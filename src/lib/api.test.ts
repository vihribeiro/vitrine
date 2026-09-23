import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, getProduct, getProducts } from './api'

function mockFetch(response: { ok: boolean; status?: number; json?: () => Promise<unknown> }) {
  const fetchMock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('api', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('monta a URL de busca com paginação', async () => {
    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({ products: [], total: 0, skip: 0, limit: 8 }),
    })

    await getProducts({ search: 'phone', page: 2, pageSize: 8 })

    const url = String(fetchMock.mock.calls[0][0])
    expect(url).toContain('/products/search')
    expect(url).toContain('q=phone')
    expect(url).toContain('limit=8')
    expect(url).toContain('skip=8')
  })

  it('usa o endpoint de categoria quando não há busca', async () => {
    const fetchMock = mockFetch({
      ok: true,
      json: async () => ({ products: [], total: 0, skip: 0, limit: 8 }),
    })

    await getProducts({ category: 'smartphones', page: 1, pageSize: 8 })

    expect(String(fetchMock.mock.calls[0][0])).toContain('/products/category/smartphones')
  })

  it('lança ApiError quando a resposta não é ok', async () => {
    mockFetch({ ok: false, status: 500 })

    await expect(getProduct(1)).rejects.toBeInstanceOf(ApiError)
  })
})
