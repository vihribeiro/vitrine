import { useEffect, useState } from 'react'
import { getCategories } from '../lib/api'
import type { Category } from '../types/product'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const controller = new AbortController()

    getCategories(controller.signal)
      .then((result) => setCategories(result))
      .catch(() => setCategories([]))

    return () => controller.abort()
  }, [])

  return categories
}
