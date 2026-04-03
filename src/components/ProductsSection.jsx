import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import ProductCard from './ProductCard'

const ITEMS_PER_PAGE = 12

function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none bg-dark-700 border border-gold-500/20 text-gray-300 font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 pr-8 focus:outline-none focus:border-gold-500 transition-colors cursor-pointer hover:border-gold-500/50"
      >
        <option value="">{label}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gold-500 pointer-events-none" />
    </div>
  )
}

export default function ProductsSection({ products, searchQuery }) {
  const [page, setPage] = useState(1)
  const [collection, setCollection] = useState('')
  const [sortBy, setSortBy] = useState('')

  const collections = [...new Set(products.map(product => product.collection))].filter(Boolean)

  let filtered = [...products]

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    )
  }

  if (collection) {
    filtered = filtered.filter(product => product.collection === collection)
  }

  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price)
  }

  if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price)
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const activeFiltersCount = collection ? 1 : 0

  return (
    <section id="products" className="px-6 pt-10 pb-18 max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="font-sans text-xs tracking-[0.15em] text-gray-500 uppercase">
          Home / <span className="text-gold-500">Products</span>
        </p>
      </div>

      <div className="text-center mb-10">
        <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-500 mb-3">Local Face Products</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Best Selling Products</h2>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-4" />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6 justify-between border-y border-gold-500/10 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-gray-400 font-sans text-xs uppercase tracking-widest mr-2">
            <SlidersHorizontal size={14} />
            Filter by
            {activeFiltersCount > 0 && (
              <span className="bg-gold-500 text-dark-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>

          <FilterSelect
            label="Collections"
            options={collections}
            value={collection}
            onChange={value => {
              setCollection(value)
              setPage(1)
            }}
          />

          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setCollection('')
                setPage(1)
              }}
              className="font-sans text-[10px] uppercase tracking-wider text-gray-500 hover:text-gold-400 transition-colors underline underline-offset-2"
            >
              Clear
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value)
              setPage(1)
            }}
            className="appearance-none bg-dark-700 border border-gold-500/20 text-gray-300 font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 pr-8 focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gold-500 pointer-events-none" />
        </div>
      </div>

      <p className="font-body text-sm text-gray-500 mb-6">
        Showing {paginated.length} of {filtered.length} fragrances
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {paginated.length > 0
          ? paginated.map(product => <ProductCard key={product.id} product={product} />)
          : (
            <div className="col-span-full text-center py-20">
              <p className="font-display text-2xl text-gray-600 mb-2">No fragrances found</p>
              <p className="font-body text-gray-500">Try adjusting your filters</p>
            </div>
          )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage(currentPage => Math.max(1, currentPage - 1))}
            disabled={page === 1}
            className="w-10 h-10 flex items-center justify-center border border-gold-500/30 text-gray-400 hover:border-gold-500 hover:text-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 font-sans text-xs font-semibold tracking-wider transition-all
                ${pageNumber === page
                  ? 'bg-gold-500 text-dark-900'
                  : 'border border-gold-500/30 text-gray-400 hover:border-gold-500 hover:text-gold-400'}`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => setPage(currentPage => Math.min(totalPages, currentPage + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 flex items-center justify-center border border-gold-500/30 text-gray-400 hover:border-gold-500 hover:text-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>

          <span className="font-sans text-xs text-gray-500 ml-2">
            Page {page} of {totalPages}
          </span>
        </div>
      )}
    </section>
  )
}
