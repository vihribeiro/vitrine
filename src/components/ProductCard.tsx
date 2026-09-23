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
    <Link
      to={`/produto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          {product.category}
        </span>
        <h3 className="line-clamp-2 font-semibold text-slate-900 dark:text-white">{product.title}</h3>
        <Rating value={product.rating} />

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {formatCurrency(product.price)}
          </span>
          {product.stock > 0 ? (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {product.stock} em estoque
            </span>
          ) : (
            <span className="text-xs font-medium text-rose-600 dark:text-rose-400">Sem estoque</span>
          )}
        </div>
      </div>
    </Link>
  )
}
