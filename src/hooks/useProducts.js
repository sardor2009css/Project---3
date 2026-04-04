import { useEffect, useState } from 'react'

const PRODUCTS_API_URL = 'https://69cba9cc0b417a19e07b043e.mockapi.io/Products'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Products API error:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return { products, isLoading }
}
