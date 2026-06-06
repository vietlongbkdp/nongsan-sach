import { useState } from 'react'
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton,
  Badge, Drawer, List, ListItem, ListItemButton, ListItemText, Divider,
  useScrollTrigger, Slide,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useApp } from '../context/AppContext'

const NAV_LINKS = [
  { key: 'home', label: 'Trang chủ', icon: 'fa-house' },
  { key: 'products', label: 'Sản phẩm', icon: 'fa-seedling' },
]

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger()
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>
}

export default function Navbar() {
  const { page, setPage, cartCount } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: '#e0f0e5',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: { xs: 2, md: 4 }, py: 0.5 }}>
            {/* Logo */}
            <Box
              onClick={() => setPage('home')}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'pointer', mr: 4 }}
            >
              <Box sx={{
                width: 44, height: 44, borderRadius: 2.5,
                background: 'linear-gradient(135deg, #1e6b3c 0%, #40916c 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(30,107,60,0.3)',
              }}>
                <i className="fas fa-leaf" style={{ color: 'white', fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 17, fontWeight: 900, color: '#1b4332', lineHeight: 1.1 }}>
                  NôngSản<span style={{ color: '#40916c' }}>Sạch</span>
                </Typography>
                <Typography sx={{ fontSize: 9, color: '#5a7a5a', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Thực phẩm hữu cơ
                </Typography>
              </Box>
            </Box>

            {/* Nav links (desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flex: 1 }}>
              {NAV_LINKS.map((l) => (
                <Button
                  key={l.key}
                  onClick={() => setPage(l.key)}
                  startIcon={<i className={`fas ${l.icon}`} style={{ fontSize: 13 }} />}
                  sx={{
                    color: page === l.key ? 'primary.main' : 'text.secondary',
                    bgcolor: page === l.key ? 'rgba(30,107,60,0.08)' : 'transparent',
                    fontWeight: page === l.key ? 700 : 500,
                    '&:hover': { bgcolor: 'rgba(30,107,60,0.07)' },
                    borderRadius: 2.5,
                    px: 2.5,
                  }}
                >
                  {l.label}
                </Button>
              ))}
            </Box>

            {/* Right side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
              {/* Phone */}
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1, mr: 1 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-phone" style={{ color: '#1e6b3c', fontSize: 13 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 10, color: 'text.secondary', lineHeight: 1 }}>Hotline</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'primary.main' }}>0800 123 456</Typography>
                </Box>
              </Box>

              {/* Cart */}
              <Button
                onClick={() => setPage('cart')}
                variant={cartCount > 0 ? 'contained' : 'outlined'}
                color="primary"
                startIcon={
                  <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 18, height: 18 } }}>
                    <ShoppingCartIcon sx={{ fontSize: 18 }} />
                  </Badge>
                }
                sx={{ borderRadius: 2.5, px: 2.5, display: { xs: 'none', md: 'flex' } }}
              >
                Giỏ hàng
              </Button>

              {/* Cart icon mobile */}
              <IconButton onClick={() => setPage('cart')} sx={{ display: { xs: 'flex', md: 'none' }, color: 'primary.main' }}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Admin */}
              <IconButton
                onClick={() => setPage('admin')}
                sx={{
                  color: page === 'admin' ? 'primary.main' : 'text.secondary',
                  bgcolor: page === 'admin' ? 'rgba(30,107,60,0.08)' : 'transparent',
                  borderRadius: 2,
                }}
                title="Trang Admin"
              >
                <AdminPanelSettingsIcon />
              </IconButton>

              {/* Hamburger mobile */}
              <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 2, pb: 2 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #1e6b3c, #40916c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-leaf" style={{ color: 'white', fontSize: 15 }} />
            </Box>
            <Typography sx={{ fontWeight: 800, color: '#1b4332', fontSize: 15 }}>NôngSản<span style={{ color: '#40916c' }}>Sạch</span></Typography>
          </Box>
          <Divider />
          <List>
            {NAV_LINKS.map((l) => (
              <ListItem key={l.key} disablePadding>
                <ListItemButton onClick={() => { setPage(l.key); setDrawerOpen(false) }} selected={page === l.key}>
                  <i className={`fas ${l.icon}`} style={{ marginRight: 12, color: '#1e6b3c', fontSize: 14 }} />
                  <ListItemText primary={l.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
