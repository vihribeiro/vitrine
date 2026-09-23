import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Rating } from '../components/Rating'
import { Spinner } from '../components/Spinner'
import { ErrorState } from '../components/States'
import { useProduct } from '../hooks/useProduct'
import { formatCurrency } from '../lib/format'

export function ProductDetailPage() {
  const { id } = useParams()
  const { data: product, loading, error, reload } = useProduct(id)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setActiveImage(0)
  }, [id])

  if (loading) return <Spinner label="Carregando produto" />
  if (error) return <ErrorState message={error} onRetry={reload} />
  if (!product) return null

  const images = product.images.length > 0 ? product.images : [product.thumbnail]
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar ao catálogo
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="aspect-square w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                    index === activeImage
                      ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                      : 'border-slate-200 hover:border-slate-400 dark:border-slate-700'
                  }`}
                  aria-label={`Ver imagem ${index + 1}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              {product.category}
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {product.title}
            </h1>
            {product.brand && (
              <p className="text-sm text-slate-500 dark:text-slate-400">Marca: {product.brand}</p>
            )}
            <Rating value={product.rating} />
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(discountedPrice)}
                </span>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300">{product.description}</p>

          <div className="flex items-center gap-3 text-sm">
            <span
              className={`rounded-full px-3 py-1 font-medium ${
                product.stock > 0
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
              }`}
            >
              {product.stock > 0 ? `${product.stock} em estoque` : 'Sem estoque'}
            </span>
            <span className="text-slate-500 dark:text-slate-400">{product.availabilityStatus}</span>
          </div>

          <dl className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 p-4 text-sm dark:border-slate-800">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Garantia</dt>
              <dd className="font-medium text-slate-800 dark:text-slate-100">{product.warrantyInformation}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Envio</dt>
              <dd className="font-medium text-slate-800 dark:text-slate-100">{product.shippingInformation}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Devolução</dt>
              <dd className="font-medium text-slate-800 dark:text-slate-100">{product.returnPolicy}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">SKU</dt>
              <dd className="font-medium text-slate-800 dark:text-slate-100">{product.sku}</dd>
            </div>
          </dl>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Avaliações</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.reviews.map((review, index) => (
              <article
                key={`${review.reviewerName}-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-1 flex items-center justify-between">
                  <strong className="text-sm text-slate-800 dark:text-slate-100">
                    {review.reviewerName}
                  </strong>
                  <Rating value={review.rating} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
