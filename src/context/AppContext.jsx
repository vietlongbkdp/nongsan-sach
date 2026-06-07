import { createContext, useContext, useState, useEffect } from 'react'
import { productsAPI, settingsAPI } from '../api'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [cart, setCart] = useState([])
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [siteName, setSiteName] = useState('NôngSản Sạch')

  // Load data from API on mount
  useEffect(() => {
    const load = async () => {
      try {
        const [prods, settings] = await Promise.all([
          productsAPI.getAll(),
          settingsAPI.get(),
        ])
        setProducts(prods)
        if (settings.youtubeUrl !== undefined) setYoutubeUrl(settings.youtubeUrl)
        if (settings.siteName) setSiteName(settings.siteName)
        setApiError(null)
      } catch (err) {
        console.error('API load error:', err)
        setApiError('Không thể kết nối server. Kiểm tra backend đã chạy chưa.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // ── Cart ──────────────────────────────────────────────────────────────────
  const addToCart = (product) => {
    setCart((prev) => {
      const key = product._id || product.id
      const exists = prev.find((i) => (i._id || i.id) === key)
      if (exists) return prev.map((i) => (i._id || i.id) === key ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => (i._id || i.id) !== id))
  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart((prev) => prev.map((i) => (i._id || i.id) === id ? { ...i, qty } : i))
  }
  const clearCart = () => setCart([])
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  // ── Products CRUD ─────────────────────────────────────────────────────────
  const addProduct = async (data) => {
    const product = await productsAPI.create(data)
    setProducts((prev) => [product, ...prev])
    return product
  }
  const updateProduct = async (id, data) => {
    const product = await productsAPI.update(id, data)
    setProducts((prev) => prev.map((p) => p._id === id ? product : p))
    return product
  }
  const deleteProduct = async (id) => {
    await productsAPI.remove(id)
    setProducts((prev) => prev.filter((p) => p._id !== id))
  }

  // ── Settings ──────────────────────────────────────────────────────────────
  const saveSettings = async (data) => {
    await settingsAPI.update(data)
    if (data.youtubeUrl !== undefined) setYoutubeUrl(data.youtubeUrl)
    if (data.siteName !== undefined) setSiteName(data.siteName)
  }

  // Navigate to product detail
  const openProduct = (product) => {
    setSelectedProduct(product)
    setPage('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AppContext.Provider value={{
      page, setPage,
      selectedProduct, setSelectedProduct, openProduct,
      products, addProduct, updateProduct, deleteProduct,
      loading, apiError,
      cart, addToCart, removeFromCart, updateQty, clearCart,
      cartCount, cartTotal,
      youtubeUrl, siteName, saveSettings,
      adminLoggedIn, setAdminLoggedIn,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
