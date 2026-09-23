import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

const product: Product = {
  id: 42,
  title: 'Produto de Teste',
  description: 'Descrição',
  category: 'beauty',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 5,
  tags: [],
  sku: 'SKU-1',
  weight: 1,
  dimensions: { width: 1, height: 1, depth: 1 },
  warrantyInformation: '1 ano',
  shippingInformation: '1 semana',
  availabilityStatus: 'In Stock',
  reviews: [],
  returnPolicy: '30 dias',
  minimumOrderQuantity: 1,
  images: [],
  thumbnail: 'thumb.jpg',
}

describe('ProductCard', () => {
  it('renderiza título, preço e link para o detalhe', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Produto de Teste')).toBeInTheDocument()
    expect(screen.getByText(/100,00/)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/produto/42')
  })

  it('mostra o desconto quando existe', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    )

    expect(screen.getByText('-10%')).toBeInTheDocument()
  })
})
