import { useEffect, useState } from 'react'
import { CartProvider } from './CartContext'
import Navbar from './components/Navbar'
import ProductsSection from './components/ProductsSection'
import SpecialOffers from './components/SpecialOffers'
import CartSidebar from './components/CartSidebar'
import Footer from './components/Footer'

const API_URL = 'https://69cba9cc0b417a19e07b043e.mockapi.io/Products'

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar onSearchChange={setSearchQuery} searchQuery={searchQuery} />
      <ProductsSection products={products} searchQuery={searchQuery} />

      <SpecialOffers products={products} />

      <Footer />
      <CartSidebar />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
