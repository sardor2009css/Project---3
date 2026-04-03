import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../useCart'

export default function CartSidebar() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQty, totalPrice, totalItems, clearCart } = useCart()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-dark-800 z-50 flex flex-col shadow-2xl shadow-black transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold-500/20">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold-500" />
            <h2 className="font-display text-xl font-bold text-white">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-gold-500 text-dark-900 font-sans text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button onClick={clearCart} className="font-sans text-[10px] uppercase tracking-wider text-gray-500 hover:text-red-400 transition-colors">
                Clear all
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
              <ShoppingBag size={48} className="text-gray-700" />
              <p className="font-display text-xl text-gray-500">Your cart is empty</p>
              <p className="font-body text-sm text-gray-600">Discover our luxury fragrances and add them to your cart.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-8 py-3 bg-gold-500 text-dark-900 font-sans text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-400 transition-colors"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 px-6 py-4 hover:bg-dark-700/50 transition-colors group">
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-dark-700 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gold-500/70 mb-0.5">{item.collection}</p>
                    <p className="font-display text-sm font-semibold text-gray-100 leading-tight mb-1 truncate">{item.name}</p>
                    <p className="font-body text-xs text-gray-500 mb-3">{item.volume}</p>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center border border-gold-500/30">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:bg-dark-600 transition-all">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-sans text-xs text-gray-200">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:bg-dark-600 transition-all">
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-display text-base font-bold text-gold-400">
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                        <button onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gold-500/20 px-6 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-xs uppercase tracking-wider text-gray-400">Subtotal</span>
              <span className="font-body text-sm text-gray-400">{totalItems} items</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-2xl font-bold text-white">Total</span>
              <span className="font-display text-2xl font-bold text-gold-400">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-gold-500 text-dark-900 font-sans text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold-400 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 mb-3">
              Checkout
            </button>
            <button onClick={() => setIsOpen(false)}
              className="w-full py-3 border border-gold-500/30 text-gray-400 font-sans text-xs tracking-[0.2em] uppercase hover:border-gold-500/60 hover:text-gray-300 transition-all">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
