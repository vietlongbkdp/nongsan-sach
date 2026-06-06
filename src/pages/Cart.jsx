import { useState } from 'react'
import {
  Box, Container, Typography, Button, Grid, Paper, Divider,
  IconButton, TextField, Chip, Dialog, DialogContent,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data'

const PROMO_CODES = { NONGSANSACH10: 10, WELCOME20: 20, HEALTHY15: 15 }

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart, setPage } = useApp()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(null)
  const [promoError, setPromoError] = useState('')
  const [checkoutDone, setCheckoutDone] = useState(false)

  const discount = promoApplied ? Math.round(cartTotal * (PROMO_CODES[promoApplied] / 100)) : 0
  const shipping = cartTotal >= 200000 ? 0 : 30000
  const finalTotal = cartTotal - discount + shipping

  const handlePromo = () => {
    const code = promoCode.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      setPromoApplied(code); setPromoError('')
    } else {
      setPromoError('Mã giảm giá không hợp lệ'); setPromoApplied(null)
    }
  }

  const handleCheckout = () => {
    setCheckoutDone(true)
    setTimeout(() => { clearCart(); setCheckoutDone(false); setPage('home') }, 3500)
  }

  if (cart.length === 0 && !checkoutDone) {
    return (
      <Box sx={{ textAlign: 'center', py: 14 }}>
        <Typography sx={{ fontSize: 80, mb: 2 }}>🛒</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>Giỏ hàng trống</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>Hãy chọn những sản phẩm tươi ngon bạn nhé!</Typography>
        <Button variant="contained" size="large" onClick={() => setPage('products')} sx={{ px: 4 }}>
          <i className="fas fa-seedling" style={{ marginRight: 8 }} />
          Mua ngay
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #0d3d21, #1e6b3c)', py: 5 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 900 }}>
            <ShoppingCartIcon sx={{ mr: 1.5, verticalAlign: 'middle', fontSize: 36 }} />
            Giỏ hàng ({cart.reduce((s, i) => s + i.qty, 0)} sản phẩm)
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
        <Grid container spacing={4}>
          {/* Cart items */}
          <Grid item xs={12} md={7.5}>
            <Paper elevation={0} sx={{ border: '1.5px solid', borderColor: '#e0f0e5', borderRadius: 3, overflow: 'hidden' }}>
              {cart.map((item, idx) => (
                <Box key={item.id}>
                  <Box sx={{ p: 2.5, display: 'flex', gap: 2.5, alignItems: 'center' }}>
                    {/* Emoji thumbnail */}
                    <Box sx={{
                      width: 72, height: 72, flexShrink: 0, borderRadius: 2.5,
                      bgcolor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 36, border: '1px solid #e0f0e5',
                    }}>
                      {item.emoji}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.3 }}>{item.name}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                        <Chip label={item.category} size="small" sx={{ height: 20, fontSize: 11, fontWeight: 600 }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          <i className="fas fa-map-marker-alt" style={{ marginRight: 3 }} />{item.origin}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: 17, fontWeight: 800, color: 'primary.main' }}>
                        {formatPrice(item.price)}
                        <Typography component="span" sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 400, ml: 0.5 }}>/{item.unit}</Typography>
                      </Typography>
                    </Box>

                    {/* Qty controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty - 1)}
                        sx={{ bgcolor: '#f0fdf4', border: '1px solid #e0f0e5', width: 30, height: 30 }}>
                        <RemoveIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                      <Typography sx={{ fontWeight: 700, minWidth: 24, textAlign: 'center', fontSize: 15 }}>{item.qty}</Typography>
                      <IconButton size="small" onClick={() => updateQty(item.id, item.qty + 1)}
                        sx={{ bgcolor: 'primary.main', color: 'white', width: 30, height: 30, '&:hover': { bgcolor: 'primary.dark' } }}>
                        <AddIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Box>

                    {/* Subtotal */}
                    <Box sx={{ minWidth: 80, textAlign: 'right' }}>
                      <Typography sx={{ fontWeight: 800, color: 'primary.dark', fontSize: 15 }}>
                        {formatPrice(item.price * item.qty)}
                      </Typography>
                    </Box>

                    <IconButton onClick={() => removeFromCart(item.id)} size="small" sx={{ color: 'error.main', '&:hover': { bgcolor: '#ffebee' } }}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                  {idx < cart.length - 1 && <Divider sx={{ mx: 2 }} />}
                </Box>
              ))}
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="outlined" onClick={() => setPage('products')} startIcon={<i className="fas fa-arrow-left" style={{ fontSize: 12 }} />}>
                Tiếp tục mua
              </Button>
              <Button variant="text" color="error" onClick={clearCart} startIcon={<DeleteOutlineIcon />}>
                Xoá giỏ hàng
              </Button>
            </Box>
          </Grid>

          {/* Summary */}
          <Grid item xs={12} md={4.5}>
            <Paper elevation={0} sx={{ border: '1.5px solid', borderColor: '#e0f0e5', borderRadius: 3, p: 3, position: 'sticky', top: 90 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                <i className="fas fa-receipt" style={{ marginRight: 8, color: '#1e6b3c' }} />
                Tóm tắt đơn hàng
              </Typography>

              {/* Promo code */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 13, color: 'text.secondary' }}>
                  MÃ GIẢM GIÁ
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small" placeholder="Nhập mã giảm giá..."
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError('') }}
                    error={!!promoError}
                    helperText={promoError || (promoApplied ? `✓ Áp dụng ${PROMO_CODES[promoApplied]}% giảm giá` : '')}
                    sx={{ flex: 1, '& .MuiFormHelperText-root': { color: promoApplied ? 'success.main' : 'error.main' } }}
                  />
                  <Button variant="outlined" onClick={handlePromo} sx={{ flexShrink: 0, px: 2 }}>
                    Áp dụng
                  </Button>
                </Box>
                <Typography sx={{ fontSize: 11.5, color: 'text.secondary', mt: 0.5 }}>
                  Thử: NONGSANSACH10 · WELCOME20 · HEALTHY15
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Price breakdown */}
              {[
                { label: 'Tạm tính', value: cartTotal },
                ...(discount > 0 ? [{ label: `Giảm giá (${PROMO_CODES[promoApplied]}%)`, value: -discount }] : []),
                { label: shipping === 0 ? 'Vận chuyển (miễn phí)' : 'Phí vận chuyển', value: shipping },
              ].map((row) => (
                <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{row.label}</Typography>
                  <Typography sx={{
                    fontWeight: 600, fontSize: 14,
                    color: row.value < 0 ? 'success.main' : row.value === 0 ? 'primary.main' : 'text.primary',
                  }}>
                    {row.value < 0 ? '-' : ''}{formatPrice(Math.abs(row.value))}
                  </Typography>
                </Box>
              ))}

              {cartTotal < 200000 && (
                <Box sx={{ bgcolor: '#fff8e1', borderRadius: 2, p: 1.5, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <i className="fas fa-truck" style={{ color: '#f57f17', fontSize: 14 }} />
                  <Typography sx={{ fontSize: 12.5, color: '#7b5e07' }}>
                    Thêm <strong>{formatPrice(200000 - cartTotal)}</strong> để miễn phí vận chuyển
                  </Typography>
                </Box>
              )}

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 16 }}>Tổng cộng</Typography>
                <Typography sx={{ fontWeight: 900, fontSize: 22, color: 'primary.main' }}>
                  {formatPrice(finalTotal)}
                </Typography>
              </Box>

              <Button
                variant="contained" fullWidth size="large"
                onClick={handleCheckout}
                sx={{ py: 1.6, fontSize: 15, fontWeight: 700, mb: 1.5, borderRadius: 2.5 }}
              >
                <i className="fas fa-lock" style={{ marginRight: 8, fontSize: 14 }} />
                Đặt hàng ({formatPrice(finalTotal)})
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                {['fa-credit-card', 'fa-money-bill-wave', 'fa-wallet'].map((icon) => (
                  <Box key={icon} sx={{ bgcolor: '#f5f5f5', borderRadius: 1, px: 1.5, py: 0.8 }}>
                    <i className={`fas ${icon}`} style={{ color: '#666', fontSize: 16 }} />
                  </Box>
                ))}
              </Box>
              <Typography sx={{ textAlign: 'center', fontSize: 11.5, color: 'text.secondary', mt: 1 }}>
                <i className="fas fa-shield-halved" style={{ marginRight: 4 }} />
                Thanh toán được mã hoá bảo mật SSL 256-bit
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Success Dialog */}
      <Dialog open={checkoutDone} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
        <DialogContent sx={{ textAlign: 'center', py: 5, px: 6 }}>
          <CheckCircleIcon sx={{ fontSize: 72, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>Đặt hàng thành công! 🎉</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            Cảm ơn bạn đã tin tưởng NôngSản Sạch. Đơn hàng của bạn đang được xử lý và sẽ được giao sớm nhất!
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
