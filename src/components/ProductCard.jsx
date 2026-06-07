import { useState } from 'react'
import { Card, CardContent, CardActions, CardActionArea, Box, Typography, Button, Chip, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { formatPrice, CATEGORY_COLORS } from '../data'
import { useApp } from '../context/AppContext'

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%25" height="100%25" fill="%23f0fdf4"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="100" font-family="serif">🌿</text></svg>'

export default function ProductCard({ product: p, onAdd }) {
  const { openProduct } = useApp()
  const [added, setAdded] = useState(false)
  const [liked, setLiked] = useState(false)
  const catColor = CATEGORY_COLORS[p.category] || { bg: '#f5f5f5', text: '#333' }

  const firstImage = p.images?.[0]?.url || null
  const imgCount = p.images?.length || 0

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', border: '1.5px solid', borderColor: 'rgba(0,0,0,0.05)' }}>
      {/* Wishlist */}
      <IconButton onClick={(e) => { e.stopPropagation(); setLiked(!liked) }} size="small"
        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2, bgcolor: 'white', boxShadow: 1, width: 30, height: 30 }}>
        <FavoriteBorderIcon sx={{ fontSize: 15, color: liked ? '#e53935' : 'text.secondary' }} />
      </IconButton>

      {p.featured && (
        <Chip label="⭐ Nổi bật" size="small" sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2, bgcolor: '#fff8e1', color: '#f57f17', fontWeight: 700, fontSize: 11, height: 22 }} />
      )}

      {/* Image / Emoji area — clickable to detail */}
      <CardActionArea onClick={() => openProduct(p)} sx={{ flexShrink: 0 }}>
        <Box sx={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', bgcolor: catColor.bg }}>
          {firstImage ? (
            <Box component="img" src={firstImage} alt={p.name} onError={(e) => { e.target.src = PLACEHOLDER }}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.08)' } }} />
          ) : (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: { xs: 56, md: 64 }, lineHeight: 1, background: `linear-gradient(135deg, ${catColor.bg}, ${catColor.bg}cc)` }}>
              {p.emoji}
            </Box>
          )}
          {/* Image count badge */}
          {imgCount > 1 && (
            <Box sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'rgba(0,0,0,0.55)', borderRadius: 1, px: 0.8, py: 0.3, display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <i className="fas fa-images" style={{ color: 'white', fontSize: 11 }} />
              <Typography sx={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{imgCount}</Typography>
            </Box>
          )}
        </Box>
      </CardActionArea>

      <CardContent sx={{ flex: 1, pb: 1 }} onClick={() => openProduct(p)} style={{ cursor: 'pointer' }}>
        <Chip label={p.category} size="small" sx={{ mb: 1, bgcolor: catColor.bg, color: catColor.text, fontWeight: 700, fontSize: 10, height: 20 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3, mb: 0.5 }}>
          {p.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <i className="fas fa-map-marker-alt" style={{ fontSize: 11, color: '#40916c' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>{p.origin}</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12.5, lineHeight: 1.55 }}>
          {(p.description || '').length > 70 ? p.description.slice(0, 70) + '…' : p.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ fontSize: 19, fontWeight: 900, color: 'primary.main', lineHeight: 1 }}>{formatPrice(p.price)}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>/{p.unit}</Typography>
        </Box>
        <Button variant={added ? 'contained' : 'outlined'} color={added ? 'success' : 'primary'} size="small"
          onClick={handleAdd}
          startIcon={added ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <AddShoppingCartIcon sx={{ fontSize: 16 }} />}
          sx={{ borderRadius: 2.5, px: 1.8, py: 0.8, fontSize: 12.5, transition: 'all 0.3s' }}>
          {added ? 'Đã thêm' : 'Thêm'}
        </Button>
      </CardActions>
    </Card>
  )
}
