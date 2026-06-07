import { ThemeProvider, CssBaseline, Box, CircularProgress, Alert, Typography } from '@mui/material'
import theme from './theme'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Admin from './pages/Admin'

function AppContent() {
  const { page, loading, apiError } = useApp()

  if (loading) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <CircularProgress color="primary" size={48} thickness={4} />
      <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>Đang tải dữ liệu...</Typography>
    </Box>
  )

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Navbar />
      {apiError && (
        <Alert severity="warning" sx={{ borderRadius: 0 }}>
          ⚠️ {apiError}
        </Alert>
      )}
      <Box component="main" sx={{ flex: 1 }}>
        {page === 'home'     && <Home />}
        {page === 'products' && <Products />}
        {page === 'detail'   && <ProductDetail />}
        {page === 'cart'     && <Cart />}
        {page === 'admin'    && <Admin />}
      </Box>
      {page !== 'admin' && <Footer />}
    </Box>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  )
}
