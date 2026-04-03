import { useState, useEffect } from 'react'
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../useCart'

export default function Navbar({ onSearchChange, searchQuery }) {
  const { totalItems, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 border-b border-gold-500/10 transition-all duration-500 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-dark-900/88 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display text-xl md:text-2xl font-bold gold-gradient flex-shrink-0">
            Local Face
          </a>

          <nav className="hidden md:flex items-center gap-7">
            <a href="#" className="font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 transition-colors duration-300">
              Home
            </a>
            <a href="#" className="font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 transition-colors duration-300">
              Shop
            </a>
            <a href="#" className="font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 transition-colors duration-300">
              About us
            </a>
            <a href="#" className="font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 transition-colors duration-300">
              Services
            </a>
            <a href="#" className="font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 transition-colors duration-300">
              Blog
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Search toggle */}
            <button onClick={() => setSearchOpen(s => !s)} className="text-gray-300 hover:text-gold-500 transition-colors">
              <Search size={18} />
            </button>
            <button className="text-gray-300 hover:text-gold-500 transition-colors hidden md:block">
              <User size={18} />
            </button>
            <button className="text-gray-300 hover:text-gold-500 transition-colors hidden md:block">
              <Heart size={18} />
            </button>
            {/* Cart */}
            <button onClick={() => setIsOpen(true)} className="relative text-gray-300 hover:text-gold-500 transition-colors">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-dark-900 text-[10px] font-bold font-sans w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(s => !s)} className="md:hidden text-gray-300 hover:text-gold-500 transition-colors">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 pb-4">
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full bg-dark-700 border border-gold-500/30 text-gray-200 font-body placeholder-gray-500 px-5 py-3 rounded-none focus:outline-none focus:border-gold-500 transition-colors text-sm tracking-wide"
            />
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-dark-800 border-t border-gold-500/20">
            <a href="#" onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 hover:bg-dark-700 transition-all">
              Home
            </a>
            <a href="#" onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 hover:bg-dark-700 transition-all">
              Shop
            </a>
            <a href="#" onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 hover:bg-dark-700 transition-all">
              About us
            </a>
            <a href="#" onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 hover:bg-dark-700 transition-all">
              Services
            </a>
            <a href="#" onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-sans text-xs tracking-[0.15em] uppercase text-gray-300 hover:text-gold-500 hover:bg-dark-700 transition-all">
              Blog
            </a>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[74px]" />
    </>
  )
}
