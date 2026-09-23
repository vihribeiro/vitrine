import { Link } from 'react-router-dom'
import { formatCurrency } from '../lib/format'
import type { Product } from '../types/product'
import { Rating } from './Rating'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPercentage > 0

  return (
    <Link to={`/produto/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="img-reveal h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        {hasDiscount && (
          <span className="absolute left-0 top-0 bg-ink px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-paper">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted">{product.category}</p>
          <h3 className="mt-0.5 truncate font-display text-[15px] font-normal leading-snug text-ink">
            {product.title}
          </h3>
          <div className="mt-1.5">
            <Rating value={product.rating} />
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[13px] font-medium tabular-nums">{formatCurrency(product.price)}</p>
          {product.stock === 0 && (
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-muted">esgotado</p>
          )}
        </div>
      </div>
    </Link>
  )
}
