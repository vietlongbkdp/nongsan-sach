import { createContext, useContext, useState } from 'react'
import { INITIAL_PRODUCTS, genId } from '../data'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [page, setPage] = useState('home')
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [cart, setCart] = useState([])
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [siteName, setSiteName] = useState('NôngSản Sạch')

  // Cart actions
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  // Product CRUD
  const addProduct = (data) => {
    setProducts((prev) => [...prev, { ...data, id: genId() }])
  }

  const updateProduct = (id, data) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...data } : p))
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <AppContext.Provider value={{
      page, setPage,
      products, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, updateQty, clearCart,
      cartCount, cartTotal,
      youtubeUrl, setYoutubeUrl,
      adminLoggedIn, setAdminLoggedIn,
      siteName, setSiteName,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
