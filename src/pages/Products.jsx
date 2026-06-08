import { useState, useMemo } from 'react'
import {
  Box, Container, Typography, TextField, InputAdornment,
  Grid, Chip, Select, MenuItem, FormControl, Slider, Paper,
  Button, Divider, Badge,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data'

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'name_asc', label: 'Tên A-Z' },
  { value: 'featured', label: 'Nổi bật trước' },
]

export default function Products() {
  const { products, addToCart, loading } = useApp()
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('Tất cả')
  const [sort, setSort] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCat !== 'Tất cả') list = list.filter((p) => p.category === activeCat)
    if (search.trim()) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.origin.toLowerCase().includes(search.toLowerCase()))
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'featured') list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    return list
  }, [products, search, activeCat, sort, priceRange])

  const resetFilters = () => {
    setSearch(''); setActiveCat('Tất cả'); setSort('default'); setPriceRange([0, 300000])
  }

  const activeFilterCount = [
    activeCat !== 'Tất cả',
    priceRange[0] > 0 || priceRange[1] < 300000,
    sort !== 'default',
  ].filter(Boolean).length

  return (
    <Box>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #0d3d21, #1e6b3c)', py: 6 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, mb: 1 }}>
            <i className="fas fa-seedling" style={{ marginRight: 12, opacity: 0.8 }} />
            Sản phẩm
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
            {products.length} sản phẩm hữu cơ sạch, tươi ngon mỗi ngày
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
        {/* Search + Sort + Filter toggle */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <TextField
            placeholder="Tìm sản phẩm, xuất xứ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: '1 1 280px', maxWidth: 420 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} displayEmpty>
              {SORT_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>

          <Badge badgeContent={activeFilterCount} color="error">
            <Button
              variant={showFilters ? 'contained' : 'outlined'}
              color="primary"
              startIcon={<TuneIcon />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{ borderRadius: 2.5 }}
            >
              Bộ lọc
            </Button>
          </Badge>

          {activeFilterCount > 0 && (
            <Button variant="text" color="error" onClick={resetFilters} size="small">
              Xoá bộ lọc
            </Button>
          )}
        </Box>

        {/* Expandable filter panel */}
        {showFilters && (
          <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1.5px solid', borderColor: '#e0f0e5', borderRadius: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2, fontSize: 14, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <i className="fas fa-tag" style={{ marginRight: 8 }} />
              Khoảng giá
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={priceRange}
                onChange={(_, v) => setPriceRange(v)}
                min={0} max={300000} step={5000}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${(v / 1000).toFixed(0)}k`}
                sx={{ color: 'primary.main' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>0đ</Typography>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  {priceRange[0].toLocaleString()}đ – {priceRange[1].toLocaleString()}đ
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>300.000đ</Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Category chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat === 'Tất cả' ? `Tất cả (${products.length})` : cat}
              onClick={() => setActiveCat(cat)}
              variant={activeCat === cat ? 'filled' : 'outlined'}
              color={activeCat === cat ? 'primary' : 'default'}
              sx={{
                fontWeight: activeCat === cat ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer',
                '&.MuiChip-filled': { boxShadow: '0 2px 8px rgba(30,107,60,0.25)' },
              }}
            />
          ))}
        </Box>

        {/* Results count */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            Hiển thị <strong style={{ color: '#1e6b3c' }}>{filtered.length}</strong> sản phẩm
            {activeCat !== 'Tất cả' && ` trong "${activeCat}"`}
          </Typography>
        </Box>

        {/* Products Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <ProductCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : filtered.length > 0 ? (
          <Grid container spacing={3}>
            {filtered.map((p) => (
              <Grid item key={p._id || p.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={p} onAdd={addToCart} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontSize: 64, mb: 2 }}>🔍</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Không tìm thấy sản phẩm</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>Thử thay đổi từ khoá hoặc bộ lọc</Typography>
            <Button variant="outlined" onClick={resetFilters}>Xoá bộ lọc</Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}
