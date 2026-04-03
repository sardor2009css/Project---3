import { useCart } from '../useCart'

export default function SpecialOffers({ products }) {
  const { addToCart } = useCart()
  const offers = products.filter(p => p.discount).slice(0, 2)

  if (offers.length === 0) return null

  return (
    <section className="py-18 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Special Offers</h2>
          <div className="w-16 h-px bg-gold-500 mx-auto mt-4" />
        </div>

        <div className="space-y-6">
          {offers.map((product, idx) => (
            <div
              key={product.id}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 overflow-hidden rounded-sm gold-border ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              style={{ background: idx % 2 === 0
                ? 'linear-gradient(135deg, #0d1a2e 0%, #0A0A0A 60%)'
                : 'linear-gradient(135deg, #1a0d00 0%, #0A0A0A 60%)' }}
            >
              <div className="md:w-1/2 h-64 md:h-80 overflow-hidden flex-shrink-0 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="md:w-1/2 p-8 md:p-14 text-center md:text-left">
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#f0dfbf] mb-3">
                  Limited Time Offer: <span className="font-bold">{product.discount}</span>
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="font-display text-gold-400 text-lg mb-4">
                  {product.collection}
                </p>
                <p className="font-body text-gray-400 leading-relaxed mb-6 max-w-sm">
                  {product.description}
                </p>
                <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                  <span className="font-display text-3xl font-bold text-gold-400">${product.price}</span>
                  {product.old_price && (
                    <span className="font-body text-xl text-gray-500 line-through">${product.old_price}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="px-8 py-3 border border-gold-500 text-gold-400 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-dark-900 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
