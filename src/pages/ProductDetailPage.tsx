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
  if (error) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12">
        <ErrorState message={error} onRetry={reload} />
      </div>
    )
  }
  if (!product) return null

  const images = product.images.length > 0 ? product.images : [product.thumbnail]
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  const specs: Array<[string, string]> = [
    ['Garantia', product.warrantyInformation],
    ['Envio', product.shippingInformation],
    ['Devolução', product.returnPolicy],
    ['SKU', product.sku],
  ]

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12">
      <Link
        to="/"
        className="inline-block text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
      >
        ← Voltar ao catálogo
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden bg-paper-2">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                  className={`h-16 w-16 shrink-0 overflow-hidden border transition-colors ${
                    index === activeImage ? 'border-ink' : 'border-line hover:border-muted'
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:pt-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{product.category}</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[0.95] tracking-[-0.04em]">
            {product.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Rating value={product.rating} />
            {product.brand && (
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
                Marca · {product.brand}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-baseline gap-4 border-t border-line pt-6">
            <span className="font-display text-3xl font-light tracking-[-0.02em] tabular-nums">
              {formatCurrency(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-[12px] text-muted line-through tabular-nums">
                  {formatCurrency(discountedPrice)}
                </span>
                <span className="bg-accent px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-white">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 max-w-prose text-[13px] leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.16em]">
            <span className={product.stock > 0 ? 'text-ink' : 'text-muted'}>
              {product.stock > 0 ? `${product.stock} em estoque` : 'Sem estoque'}
            </span>
            <span className="text-muted">{product.availabilityStatus}</span>
          </div>

          <dl className="mt-8 border-t border-line">
            {specs.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-line py-3">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">{label}</dt>
                <dd className="text-[12px]">{value}</dd>
              </div>
            ))}
          </dl>

          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-line px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="mt-20 border-t border-line pt-10">
          <h2 className="text-[10px] uppercase tracking-[0.22em] text-muted">Avaliações</h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {product.reviews.map((review, index) => (
              <article key={`${review.reviewerName}-${index}`} className="border-t border-line pt-4">
                <div className="flex items-center justify-between gap-4">
                  <strong className="text-[12px] font-medium">{review.reviewerName}</strong>
                  <Rating value={review.rating} />
                </div>
                <p className="mt-2 text-[13px] text-muted">{review.comment}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
