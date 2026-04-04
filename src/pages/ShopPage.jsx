import { useOutletContext } from 'react-router-dom'
import ProductsSection from '../components/ProductsSection'
import SpecialOffers from '../components/SpecialOffers'
import Footer from '../components/Footer'

export default function ShopPage() {
  const { searchQuery } = useOutletContext()

  return (
    <>
      <ProductsSection searchQuery={searchQuery} />
      <SpecialOffers />
      <Footer />
    </>
  )
}
