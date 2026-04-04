import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CartProvider } from './CartContext'
import { useCart } from './useCart'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'

function AppLayout() {
  const { addToCart, totalItems } = useCart()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar onSearchChange={setSearchQuery} searchQuery={searchQuery} />
      <Outlet context={{ addToCart, cartCount: totalItems, searchQuery }} />
      <CartSidebar />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppLayout />
    </CartProvider>
  )
}
