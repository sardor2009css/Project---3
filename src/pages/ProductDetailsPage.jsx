import { Link, useOutletContext, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import useProducts from '../hooks/useProducts'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useOutletContext()
  const { products, isLoading } = useProducts()
  const [qty, setQty] = useState(1)

  const product = useMemo(() => {
    return products.find(item => item.slug === id || item.id === id) || null
  }, [id, products])

  const galleryItems = useMemo(() => {
    if (!product) return []

    const relatedImages = products
      .filter(item =>
        item.id !== product.id &&
        (item.collection === product.collection || item.family === product.family)
      )
      .map(item => item.image)

    return [product.image, ...relatedImages]
      .filter((image, index, array) => image && array.indexOf(image) === index)
      .slice(0, 4)
      .map((image, index) => ({
        label: index === 0 ? product.volume : `View ${index + 1}`,
        image,
      }))
  }, [product, products])

  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    setActiveImage(galleryItems[0]?.image || '')
    setQty(1)
  }, [galleryItems])

  const discoverProducts = useMemo(() => {
    if (!product) return []

    return products
      .filter(item => item.id !== product.id)
      .slice(0, 4)
  }, [product, products])

  const minusQty = () => {
    if (qty > 1) {
      setQty(prev => prev - 1)
    }
  }

  const plusQty = () => {
    setQty(prev => prev + 1)
  }

  const handleAddToCart = () => {
    if (!product) return

    for (let i = 0; i < qty; i += 1) {
      addToCart(product)
    }

    alert(`${product.name} savatchaga qo'shildi`)
  }

  if (isLoading) {
    return (
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 text-center text-white/70">
          Loading product...
        </div>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 text-center">
          <h1 className="text-3xl font-semibold">Product not found</h1>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-xl border border-white/20 px-6 py-3 text-sm text-white/80 hover:bg-white/10"
          >
            Back to Shop
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-8 text-sm text-white/60">
          Home / Shop / <span className="text-white">{product.name}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="flex h-[520px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#050505]">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="h-full max-h-[470px] object-contain"
              />
            </div>

            <div className="mt-6 flex gap-3">
              {galleryItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(item.image)}
                  className={`rounded-xl border px-3 py-3 text-center ${
                    activeImage === item.image
                      ? 'border-[#c97b39] bg-[#111]'
                      : 'border-white/20 bg-black'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="mx-auto mb-2 h-16 w-12 rounded object-cover"
                  />
                  <p className="text-xs">{item.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#c97b39]">
              {product.collection}
            </p>
            <h1 className="mb-4 text-4xl font-semibold">{product.name}</h1>

            <p className="mb-5 max-w-[520px] text-sm leading-7 text-white/70">
              {product.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/60">
              <span className="rounded-full border border-white/15 px-3 py-2">{product.family}</span>
              <span className="rounded-full border border-white/15 px-3 py-2">{product.gender}</span>
              <span className="rounded-full border border-white/15 px-3 py-2">{product.occasion}</span>
              <span className="rounded-full border border-white/15 px-3 py-2">{product.volume}</span>
            </div>

            <div className="mb-5 flex items-center gap-3">
              <p className="text-sm text-white/60">
                Rating {product.rating} / 5
              </p>
              <p className="text-sm text-white/60">
                ({product.reviews}) Reviews
              </p>
            </div>

            <p className="mb-6 text-3xl font-semibold text-[#c97b39]">
              ${product.price}.00
              {product.old_price && (
                <span className="ml-3 text-lg text-white/35 line-through">
                  ${product.old_price}.00
                </span>
              )}
            </p>

            {product.discount && (
              <p className="mb-6 text-sm uppercase tracking-[0.2em] text-[#c97b39]">
                {product.discount}
              </p>
            )}

            <div className="mb-6 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/70">Qty</span>

                <div className="flex items-center rounded-xl border border-white/30">
                  <button
                    onClick={minusQty}
                    className="px-4 py-2 text-lg hover:bg-white/10"
                  >
                    -
                  </button>

                  <span className="px-4 py-2">{qty}</span>

                  <button
                    onClick={plusQty}
                    className="px-4 py-2 text-lg hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              <span
                className={`text-sm ${
                  product.in_stock ? 'text-white/80' : 'text-red-400'
                }`}
              >
                {product.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className={`mb-4 w-full max-w-[330px] rounded-xl py-3 font-medium transition ${
                product.in_stock
                  ? 'bg-white text-black hover:opacity-90'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              Add to Bag
            </button>

            <p className="text-xs text-white/50">
              Premium fragrance from the {product.collection} collection.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-4 text-3xl font-semibold">Product Overview</h2>
          <p className="max-w-[1000px] text-sm leading-7 text-white/70">
            {product.description}
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c97b39]">Collection</p>
            <h3 className="text-2xl font-semibold">{product.collection}</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Crafted to reflect the character of the {product.collection} range.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c97b39]">Fragrance Family</p>
            <h3 className="text-2xl font-semibold">{product.family}</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Built around a {product.family.toLowerCase()} signature for a distinctive presence.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c97b39]">Best For</p>
            <h3 className="text-2xl font-semibold">{product.occasion}</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Designed for {product.gender.toLowerCase()} wear and ideal for {product.occasion.toLowerCase()} moments.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-12 text-center text-5xl font-semibold text-[#c97b39]">
            Reviews
          </h2>

          <div className="mb-14 grid gap-10 lg:grid-cols-2">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(star => {
                const fillWidth = `${Math.max(0, Math.min(100, product.rating * 20 - (5 - star) * 18))}%`

                return (
                  <div key={star} className="flex items-center gap-4">
                    <span className="w-12 text-sm text-white/60">{star} star</span>
                    <div className="h-3 flex-1 rounded-full bg-white/15">
                      <div
                        className="h-3 rounded-full bg-[#c97b39]"
                        style={{ width: fillWidth }}
                      ></div>
                    </div>
                    <span className="text-sm text-white/60">{Math.round(parseFloat(fillWidth))}%</span>
                  </div>
                )
              })}
            </div>

            <div>
              <h3 className="mb-2 text-3xl">{product.rating} out of 5</h3>
              <p className="mb-2 text-white/70">
                Based on {product.reviews} customer reviews
              </p>
              <p className="text-white/70">
                {product.in_stock ? 'Currently available to order' : 'Currently unavailable'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-12 text-center text-5xl font-semibold text-[#c97b39]">
            Discover More
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {discoverProducts.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.slug || item.id}`}
                className="rounded-2xl bg-[#0b0b0b] p-4 transition hover:-translate-y-1"
              >
                <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-xl bg-[#111]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-lg">{item.name}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                  <span className="text-[#c97b39]">${item.price}.00</span>
                  <span>{item.volume}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
