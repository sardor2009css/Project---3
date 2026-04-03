import { ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../useCart'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={i <= Math.round(rating) ? 'star-filled fill-current' : 'star-empty fill-current'}
        />
      ))}
    </div>
  )
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="card-hover group relative overflow-hidden rounded-sm bg-dark-800 gold-border">
      {/* Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 z-10 bg-gold-500 text-dark-900 font-sans text-[9px] tracking-[0.15em] uppercase font-bold px-2 py-1">
          {product.discount}
        </div>
      )}
      {!product.in_stock && (
        <div className="absolute top-3 right-3 z-10 bg-dark-600 text-gray-400 font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 border border-gray-600">
          Out of Stock
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#161616] to-[#0b0b0b] aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.target.src = 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=LF' }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-3 pb-6">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.in_stock}
            className={`flex items-center gap-2 px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0
              ${product.in_stock
                ? 'bg-gold-500 text-dark-900 hover:bg-gold-400'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
          >
            <ShoppingBag size={14} />
            {product.in_stock ? 'Add to Cart' : 'Unavailable'}
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-gold-500/40 text-gold-400 font-sans text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-gold-500/10"
          >
            More Info
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold-500/70 mb-1">{product.collection}</p>
        <h3 className="font-display text-sm md:text-base font-semibold text-gray-100 leading-tight mb-2 min-h-10">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="font-sans text-[10px] text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-lg font-bold text-gold-400">${product.price}</span>
            {product.old_price && (
              <span className="font-body text-sm text-gray-500 line-through ml-2">${product.old_price}</span>
            )}
          </div>
          <span className="font-sans text-[9px] tracking-widest text-gray-500 uppercase">{product.volume}</span>
        </div>
      </div>
    </div>
  )
}
