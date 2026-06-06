import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import theme from './theme'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Admin from './pages/Admin'

function AppContent() {
  const { page } = useApp()
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        {page === 'home' && <Home />}
        {page === 'products' && <Products />}
        {page === 'cart' && <Cart />}
        {page === 'admin' && <Admin />}
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
