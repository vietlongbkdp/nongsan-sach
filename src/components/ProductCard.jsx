import { useState } from 'react'
import {
  Card, CardContent, CardActions, Box, Typography,
  Button, Chip, IconButton, Tooltip,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { formatPrice, CATEGORY_COLORS } from '../data'

export default function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false)
  const [liked, setLiked] = useState(false)
  const catColor = CATEGORY_COLORS[product.category] || { bg: '#f5f5f5', text: '#333' }

  const handleAdd = () => {
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        border: '1.5px solid',
        borderColor: 'rgba(0,0,0,0.05)',
        '&:hover .card-overlay': { opacity: 1 },
      }}
    >
      {/* Wishlist button */}
      <IconButton
        onClick={() => setLiked(!liked)}
        size="small"
        sx={{
          position: 'absolute', top: 10, right: 10, zIndex: 2,
          bgcolor: 'white', boxShadow: 1, width: 30, height: 30,
          '&:hover': { bgcolor: '#fff8e1' },
        }}
      >
        <FavoriteBorderIcon sx={{ fontSize: 16, color: liked ? '#e53935' : 'text.secondary' }} />
      </IconButton>

      {product.featured && (
        <Chip
          label="⭐ Nổi bật"
          size="small"
          sx={{
            position: 'absolute', top: 10, left: 10, zIndex: 2,
            bgcolor: '#fff8e1', color: '#f57f17', fontWeight: 700, fontSize: 11,
            height: 22,
          }}
        />
      )}

      {/* Image / Emoji area */}
      <Box sx={{
        background: `linear-gradient(135deg, ${catColor.bg} 0%, ${catColor.bg}cc 100%)`,
        py: 3.5, px: 2, textAlign: 'center',
        fontSize: { xs: 52, md: 60 },
        lineHeight: 1,
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""', position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        },
      }}>
        {product.emoji}
      </Box>

      <CardContent sx={{ flex: 1, pb: 1 }}>
        {/* Category chip */}
        <Chip
          label={product.category}
          size="small"
          sx={{
            mb: 1, bgcolor: catColor.bg, color: catColor.text,
            fontWeight: 700, fontSize: 10, height: 20, letterSpacing: '0.3px',
          }}
        />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3, mb: 0.5 }}>
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <i className="fas fa-map-marker-alt" style={{ fontSize: 11, color: '#40916c' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {product.origin}
          </Typography>
          <Box sx={{ mx: 0.5, width: 3, height: 3, borderRadius: '50%', bgcolor: '#ccc' }} />
          <i className="fas fa-boxes-stacked" style={{ fontSize: 10, color: '#aaa' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {product.stock} {product.unit}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12.5, lineHeight: 1.55 }}>
          {product.description.length > 80 ? product.description.slice(0, 80) + '…' : product.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ fontSize: 19, fontWeight: 900, color: 'primary.main', lineHeight: 1 }}>
            {formatPrice(product.price)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>/{product.unit}</Typography>
        </Box>

        <Tooltip title={added ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ'}>
          <Button
            variant={added ? 'contained' : 'outlined'}
            color={added ? 'success' : 'primary'}
            size="small"
            onClick={handleAdd}
            startIcon={added ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <AddShoppingCartIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: 2.5, px: 1.8, py: 0.8, fontSize: 12.5,
              transition: 'all 0.3s ease',
              boxShadow: added ? '0 4px 12px rgba(46,125,50,0.3)' : 'none',
            }}
          >
            {added ? 'Đã thêm' : 'Thêm'}
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
