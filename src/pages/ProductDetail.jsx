import { useState } from 'react'
import {
  Box, Container, Grid, Typography, Button, Chip, Divider,
  IconButton, Paper, Tabs, Tab, Breadcrumbs, Link,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ImageGallery from '../components/ImageGallery'
import ProductCard from '../components/ProductCard'
import { useApp } from '../context/AppContext'
import { formatPrice, CATEGORY_COLORS } from '../data'

export default function ProductDetail() {
  const { selectedProduct: p, products, addToCart, setPage, setSelectedProduct } = useApp()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState(0)
  const [liked, setLiked] = useState(false)

  if (!p) { setPage('products'); return null }

  const catColor = CATEGORY_COLORS[p.category] || { bg: '#f5f5f5', text: '#333' }
  const related = products.filter((r) => r._id !== p._id && r.category === p.category).slice(0, 4)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const goBack = () => { setSelectedProduct(null); setPage('products') }

  return (
    <Box>
      {/* Breadcrumb */}
      <Box sx={{ bgcolor: '#f0fdf4', borderBottom: '1px solid #e0f0e5', py: 1.5 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
          <Breadcrumbs separator="›" sx={{ fontSize: 13 }}>
            <Link underline="hover" onClick={() => setPage('home')} sx={{ cursor: 'pointer', color: 'text.secondary' }}>Trang chủ</Link>
            <Link underline="hover" onClick={() => setPage('products')} sx={{ cursor: 'pointer', color: 'text.secondary' }}>Sản phẩm</Link>
            <Link underline="hover" onClick={goBack} sx={{ cursor: 'pointer', color: 'text.secondary' }}>{p.category}</Link>
            <Typography sx={{ fontSize: 13, color: 'primary.main', fontWeight: 600 }}>{p.name}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
        {/* Back button */}
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mb: 3, color: 'text.secondary' }}>
          Quay lại
        </Button>

        <Grid container spacing={5}>
          {/* LEFT – Image Gallery */}
          <Grid item xs={12} md={5}>
            <ImageGallery images={p.images || []} alt={p.name} />
          </Grid>

          {/* RIGHT – Product Info */}
          <Grid item xs={12} md={7}>
            {/* Category + badges */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip label={p.category} size="small" sx={{ bgcolor: catColor.bg, color: catColor.text, fontWeight: 700 }} />
              {p.featured && <Chip label="⭐ Nổi bật" size="small" sx={{ bgcolor: '#fff8e1', color: '#f57f17', fontWeight: 700 }} />}
              {p.stock < 10 && <Chip label="⚡ Sắp hết" size="small" sx={{ bgcolor: '#ffebee', color: '#c62828', fontWeight: 700 }} />}
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1.5, lineHeight: 1.25 }}>
              {p.name}
            </Typography>

            {/* Origin + stock */}
            <Box sx={{ display: 'flex', gap: 3, mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <i className="fas fa-map-marker-alt" style={{ color: '#40916c', fontSize: 14 }} />
                <Typography sx={{ fontSize: 14, color: 'text.secondary', fontWeight: 500 }}>{p.origin}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <i className="fas fa-boxes-stacked" style={{ color: '#40916c', fontSize: 13 }} />
                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                  Còn <strong style={{ color: p.stock < 10 ? '#c62828' : '#1e6b3c' }}>{p.stock}</strong> {p.unit}
                </Typography>
              </Box>
            </Box>

            {/* Price */}
            <Box sx={{ bgcolor: '#f0fdf4', borderRadius: 3, p: 2.5, mb: 3, display: 'inline-block' }}>
              <Typography sx={{ fontSize: 38, fontWeight: 900, color: 'primary.main', lineHeight: 1 }}>
                {formatPrice(p.price)}
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 0.3 }}>Giá / {p.unit}</Typography>
            </Box>

            {/* Trust badges */}
            <Box sx={{ display: 'flex', gap: 2.5, mb: 3, flexWrap: 'wrap' }}>
              {[
                { icon: 'fa-leaf', label: '100% Hữu cơ' },
                { icon: 'fa-certificate', label: 'VietGAP' },
                { icon: 'fa-truck-fast', label: 'Giao trong ngày' },
                { icon: 'fa-rotate-left', label: 'Đổi trả 24h' },
              ].map((b) => (
                <Box key={b.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <i className={`fas ${b.icon}`} style={{ color: '#40916c', fontSize: 13 }} />
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 500 }}>{b.label}</Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Qty + Add to Cart */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
              {/* Quantity selector */}
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid', borderColor: 'primary.light',
                borderRadius: 2.5, overflow: 'hidden',
              }}>
                <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))} size="small"
                  sx={{ borderRadius: 0, width: 38, height: 42, '&:hover': { bgcolor: '#f0fdf4' } }}>
                  <RemoveIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography sx={{ minWidth: 40, textAlign: 'center', fontWeight: 800, fontSize: 17 }}>{qty}</Typography>
                <IconButton onClick={() => setQty((q) => Math.min(p.stock, q + 1))} size="small"
                  sx={{ borderRadius: 0, width: 38, height: 42, '&:hover': { bgcolor: '#f0fdf4' } }}>
                  <AddIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>

              <Button
                variant="contained" size="large"
                onClick={handleAdd}
                disabled={p.stock === 0}
                startIcon={<AddShoppingCartIcon />}
                sx={{
                  flex: 1, py: 1.5, fontSize: 15, fontWeight: 700, borderRadius: 2.5,
                  bgcolor: added ? 'success.main' : 'primary.main',
                  '&:hover': { bgcolor: added ? 'success.dark' : 'primary.dark' },
                  transition: 'background-color 0.3s',
                }}
              >
                {p.stock === 0 ? 'Hết hàng' : added ? `✓ Đã thêm ${qty} ${p.unit}!` : `Thêm vào giỏ • ${formatPrice(p.price * qty)}`}
              </Button>

              <IconButton onClick={() => setLiked(!liked)} sx={{ border: '1.5px solid', borderColor: '#e0f0e5', borderRadius: 2, color: liked ? '#e53935' : 'text.secondary' }}>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton sx={{ border: '1.5px solid', borderColor: '#e0f0e5', borderRadius: 2, color: 'text.secondary' }}>
                <ShareIcon />
              </IconButton>
            </Box>

            {/* Subtotal */}
            {qty > 1 && (
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
                Thành tiền: <strong style={{ color: '#1e6b3c', fontSize: 16 }}>{formatPrice(p.price * qty)}</strong>
              </Typography>
            )}

            {/* Description tabs */}
            <Paper elevation={0} sx={{ border: '1.5px solid #e0f0e5', borderRadius: 3, mt: 2 }}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 2.5 }, '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, fontSize: 13.5 } }}>
                <Tab label="Mô tả" />
                <Tab label="Thông tin dinh dưỡng" />
                <Tab label="Vận chuyển" />
              </Tabs>
              <Divider />
              <Box sx={{ p: 2.5 }}>
                {tab === 0 && (
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.85, fontSize: 14.5 }}>
                    {p.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
                  </Typography>
                )}
                {tab === 1 && (
                  <Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 1 }}>
                      Sản phẩm <strong>{p.name}</strong> được trồng theo phương pháp hữu cơ, không sử dụng thuốc trừ sâu hay phân bón hoá học, giữ nguyên hàm lượng dinh dưỡng tự nhiên.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 1.5 }}>
                      {['Giàu vitamin', 'Chất xơ tự nhiên', 'Khoáng chất', 'Không GMO'].map((tag) => (
                        <Chip key={tag} label={tag} size="small" icon={<VerifiedIcon sx={{ fontSize: 14, color: '#1e6b3c !important' }} />} sx={{ bgcolor: '#f0fdf4', color: '#1e6b3c', fontWeight: 600 }} />
                      ))}
                    </Box>
                  </Box>
                )}
                {tab === 2 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {[
                      { icon: 'fa-truck-fast', text: 'Giao nội thành trong ngày (đặt trước 14:00)' },
                      { icon: 'fa-box', text: 'Đóng gói chân không, giữ độ tươi tối đa' },
                      { icon: 'fa-money-bill-wave', text: 'Miễn phí vận chuyển đơn từ 200.000đ' },
                      { icon: 'fa-rotate-left', text: 'Đổi trả miễn phí trong 24h nếu không đạt chất lượng' },
                    ].map((item) => (
                      <Box key={item.text} sx={{ display: 'flex', gap: 1.2 }}>
                        <i className={`fas ${item.icon}`} style={{ color: '#40916c', fontSize: 14, marginTop: 3, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{item.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Related Products */}
        {related.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              <i className="fas fa-seedling" style={{ color: '#40916c', marginRight: 10 }} />
              Sản phẩm cùng danh mục
            </Typography>
            <Grid container spacing={3}>
              {related.map((r) => (
                <Grid item key={r._id} xs={12} sm={6} md={3}>
                  <ProductCard product={r} onAdd={addToCart} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  )
}
