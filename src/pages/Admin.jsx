import { useState } from 'react'
import {
  Box, Container, Typography, Button, TextField, Grid, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  IconButton, Chip, Switch, FormControlLabel, Tab, Tabs, Alert,
  InputAdornment, Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import { useApp } from '../context/AppContext'
import { formatPrice, CATEGORIES, CATEGORY_COLORS, genId } from '../data'

const ADMIN_PASSWORD = 'admin123'

const EMPTY_FORM = {
  name: '', category: 'Rau củ', price: '', unit: '', emoji: '🥦',
  description: '', origin: '', stock: '', featured: false,
}

function StatCard({ icon, label, value, color }) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1.5px solid', borderColor: '#e0f0e5', textAlign: 'center' }}>
      <Box sx={{ width: 52, height: 52, borderRadius: 2.5, bgcolor: color + '20', mx: 'auto', mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className={`fas ${icon}`} style={{ color, fontSize: 22 }} />
      </Box>
      <Typography sx={{ fontSize: 28, fontWeight: 900, color: '#1a2e1a', lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>{label}</Typography>
    </Paper>
  )
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, adminLoggedIn, setAdminLoggedIn, youtubeUrl, setYoutubeUrl, siteName, setSiteName } = useApp()

  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [tab, setTab] = useState(0)

  // Product management state
  const [search, setSearch] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [formError, setFormError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Settings state
  const [ytInput, setYtInput] = useState(youtubeUrl)
  const [siteNameInput, setSiteNameInput] = useState(siteName)
  const [settingsSaved, setSettingsSaved] = useState(false)

  // Login
  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAdminLoggedIn(true); setPwError('') }
    else setPwError('Mật khẩu không đúng. Thử lại!')
  }

  // Form helpers
  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const openAdd = () => {
    setForm(EMPTY_FORM); setEditingId(null); setFormError(''); setEditOpen(true)
  }

  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), unit: p.unit, emoji: p.emoji, description: p.description, origin: p.origin, stock: String(p.stock), featured: p.featured })
    setEditingId(p.id); setFormError(''); setEditOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.price || !form.unit.trim() || !form.origin.trim() || !form.stock) {
      setFormError('Vui lòng điền đầy đủ các trường bắt buộc (*)'); return
    }
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if (editingId) updateProduct(editingId, data)
    else addProduct({ ...data, id: genId() })
    setEditOpen(false); setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
  }

  const handleDelete = () => {
    deleteProduct(deleteTarget.id); setDeleteTarget(null)
  }

  const handleSaveSettings = () => {
    setYoutubeUrl(ytInput); setSiteName(siteNameInput)
    setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2500)
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search)
  )

  // ── LOGIN SCREEN ──
  if (!adminLoggedIn) {
    return (
      <Box sx={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
        <Paper elevation={0} sx={{ maxWidth: 420, width: '100%', p: 5, borderRadius: 4, border: '1.5px solid #e0f0e5' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ width: 68, height: 68, borderRadius: 3, background: 'linear-gradient(135deg, #1e6b3c, #40916c)', mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LockIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>Trang Quản Trị</Typography>
            <Typography sx={{ color: 'text.secondary', mt: 0.5, fontSize: 14 }}>Nhập mật khẩu để đăng nhập</Typography>
          </Box>
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth label="Mật khẩu" type="password"
              value={pw} onChange={(e) => { setPw(e.target.value); setPwError('') }}
              error={!!pwError} helperText={pwError}
              placeholder="••••••••"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>
              }}
            />
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.4, fontWeight: 700, fontSize: 15 }}>
              <i className="fas fa-sign-in-alt" style={{ marginRight: 8 }} />
              Đăng nhập
            </Button>
            <Typography sx={{ textAlign: 'center', fontSize: 12, color: 'text.secondary', mt: 2 }}>
              Demo: mật khẩu là <code style={{ background: '#f0fdf4', padding: '2px 6px', borderRadius: 4, color: '#1e6b3c' }}>admin123</code>
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  }

  // ── ADMIN DASHBOARD ──
  const catCounts = CATEGORIES.slice(1).map((c) => ({ cat: c, count: products.filter((p) => p.category === c).length }))

  return (
    <Box sx={{ bgcolor: '#f7fdf4', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #0d3d21, #1e6b3c)', py: 4 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 900 }}>
              <i className="fas fa-chart-line" style={{ marginRight: 12, opacity: 0.8 }} />
              Bảng Quản Trị
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 13.5, mt: 0.3 }}>
              NôngSản Sạch – Admin Dashboard
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<LogoutIcon />}
            onClick={() => setAdminLoggedIn(false)}
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}>
            Đăng xuất
          </Button>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
        {saveSuccess && <Alert severity="success" sx={{ mb: 3 }}>Lưu thành công!</Alert>}

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{
            '& .MuiTab-root': { fontWeight: 700, fontSize: 14, textTransform: 'none', minWidth: 140 },
            '& .Mui-selected': { color: 'primary.main' },
            '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 3, borderRadius: '3px 3px 0 0' },
          }}>
            <Tab label={<span><i className="fas fa-gauge" style={{ marginRight: 8 }} />Tổng quan</span>} />
            <Tab label={<span><i className="fas fa-boxes-stacked" style={{ marginRight: 8 }} />Sản phẩm ({products.length})</span>} />
            <Tab label={<span><i className="fas fa-gear" style={{ marginRight: 8 }} />Cài đặt</span>} />
          </Tabs>
        </Box>

        {/* ── TAB 0: OVERVIEW ── */}
        {tab === 0 && (
          <Box>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              <Grid item xs={6} md={3}><StatCard icon="fa-boxes-stacked" label="Tổng sản phẩm" value={products.length} color="#1e6b3c" /></Grid>
              <Grid item xs={6} md={3}><StatCard icon="fa-star" label="Sản phẩm nổi bật" value={products.filter((p) => p.featured).length} color="#f0a845" /></Grid>
              <Grid item xs={6} md={3}><StatCard icon="fa-tags" label="Danh mục" value={CATEGORIES.length - 1} color="#1565c0" /></Grid>
              <Grid item xs={6} md={3}><StatCard icon="fa-warehouse" label="Tổng tồn kho" value={products.reduce((s, p) => s + p.stock, 0)} color="#880e4f" /></Grid>
            </Grid>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Sản phẩm theo danh mục</Typography>
            <Grid container spacing={2}>
              {catCounts.map(({ cat, count }) => {
                const colors = CATEGORY_COLORS[cat] || { bg: '#f5f5f5', text: '#333' }
                return (
                  <Grid item xs={6} sm={4} md={2} key={cat}>
                    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: colors.bg, textAlign: 'center', border: '1px solid', borderColor: 'rgba(0,0,0,0.06)' }}>
                      <Typography sx={{ fontSize: 22, fontWeight: 900, color: colors.text }}>{count}</Typography>
                      <Typography sx={{ fontSize: 12, color: colors.text, fontWeight: 600 }}>{cat}</Typography>
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        )}

        {/* ── TAB 1: PRODUCTS ── */}
        {tab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <TextField
                size="small" placeholder="Tìm theo tên, danh mục..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                sx={{ width: 300 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }}
              />
              <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd} sx={{ px: 3 }}>
                Thêm sản phẩm
              </Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1.5px solid', borderColor: '#e0f0e5', borderRadius: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Sản phẩm</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Danh mục</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Giá</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Đơn vị</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Tồn kho</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Nổi bật</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((p) => {
                    const cc = CATEGORY_COLORS[p.category] || { bg: '#f5f5f5', text: '#333' }
                    return (
                      <TableRow key={p.id} sx={{ '&:hover': { bgcolor: '#f8fdf8' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: cc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                              {p.emoji}
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{p.name}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{p.origin}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={p.category} size="small" sx={{ bgcolor: cc.bg, color: cc.text, fontWeight: 700, fontSize: 11 }} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{formatPrice(p.price)}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>{p.unit}</TableCell>
                        <TableCell>
                          <Chip
                            label={p.stock}
                            size="small"
                            color={p.stock < 10 ? 'error' : p.stock < 30 ? 'warning' : 'success'}
                            variant="outlined"
                            sx={{ fontWeight: 700, minWidth: 44, fontSize: 12 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={p.featured ? '⭐ Có' : 'Không'}
                            size="small"
                            sx={{ bgcolor: p.featured ? '#fff8e1' : '#f5f5f5', color: p.featured ? '#f57f17' : '#888', fontWeight: 600, fontSize: 11 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Chỉnh sửa">
                            <IconButton size="small" onClick={() => openEdit(p)} sx={{ color: 'primary.main', mr: 0.5 }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xoá">
                            <IconButton size="small" onClick={() => setDeleteTarget(p)} sx={{ color: 'error.main' }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* ── TAB 2: SETTINGS ── */}
        {tab === 2 && (
          <Box sx={{ maxWidth: 640 }}>
            {settingsSaved && <Alert severity="success" sx={{ mb: 3 }}>Đã lưu cài đặt thành công!</Alert>}

            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, border: '1.5px solid #e0f0e5', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                <i className="fab fa-youtube" style={{ color: '#ff0000', marginRight: 8 }} />
                Video Banner (YouTube)
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 13.5, mb: 2.5 }}>
                Nhúng video YouTube vào phần banner trang chủ. Hỗ trợ các định dạng link YouTube thông thường.
              </Typography>
              <TextField
                fullWidth label="Link YouTube"
                placeholder="https://www.youtube.com/watch?v=..."
                value={ytInput}
                onChange={(e) => setYtInput(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><i className="fab fa-youtube" style={{ color: '#ff0000', fontSize: 18 }} /></InputAdornment>
                }}
                helperText="Ví dụ: https://www.youtube.com/watch?v=VIDEO_ID hoặc https://youtu.be/VIDEO_ID"
              />
              {ytInput && (
                <Box sx={{ borderRadius: 2, overflow: 'hidden', aspectRatio: '16/9', mb: 2, bgcolor: '#000' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${ytInput.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1] || ''}?rel=0`}
                    title="Preview video"
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    allowFullScreen
                  />
                </Box>
              )}
            </Paper>

            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, border: '1.5px solid #e0f0e5', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                <i className="fas fa-store" style={{ color: '#1e6b3c', marginRight: 8 }} />
                Thông tin cửa hàng
              </Typography>
              <TextField
                fullWidth label="Tên website" value={siteNameInput}
                onChange={(e) => setSiteNameInput(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Paper>

            <Button variant="contained" size="large" onClick={handleSaveSettings} sx={{ px: 4 }}>
              <i className="fas fa-save" style={{ marginRight: 8 }} />
              Lưu cài đặt
            </Button>
          </Box>
        )}
      </Container>

      {/* ── ADD/EDIT DIALOG ── */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
          {editingId ? '✏️ Chỉnh sửa sản phẩm' : '➕ Thêm sản phẩm mới'}
        </DialogTitle>
        <DialogContent dividers>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField fullWidth required label="Tên sản phẩm *" value={form.name} onChange={(e) => setField('name', e.target.value)} />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="Emoji" value={form.emoji} onChange={(e) => setField('emoji', e.target.value)} inputProps={{ maxLength: 2 }} />
            </Grid>
            <Grid item xs={6}>
              <TextField select fullWidth label="Danh mục *" value={form.category} onChange={(e) => setField('category', e.target.value)} SelectProps={{ native: true }}>
                {CATEGORIES.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth required label="Xuất xứ *" value={form.origin} onChange={(e) => setField('origin', e.target.value)} />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth required label="Giá (đ) *" type="number" value={form.price} onChange={(e) => setField('price', e.target.value)} inputProps={{ min: 0 }} />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth required label="Đơn vị *" value={form.unit} onChange={(e) => setField('unit', e.target.value)} placeholder="kg, bó, hộp…" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth required label="Tồn kho *" type="number" value={form.stock} onChange={(e) => setField('stock', e.target.value)} inputProps={{ min: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Mô tả sản phẩm" value={form.description} onChange={(e) => setField('description', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} color="primary" />}
                label={<Typography sx={{ fontWeight: 600 }}>Sản phẩm nổi bật (hiển thị trên trang chủ)</Typography>}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="outlined" onClick={() => setEditOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSave} sx={{ px: 3 }}>
            <i className="fas fa-save" style={{ marginRight: 6 }} />
            {editingId ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── DELETE CONFIRM ── */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 800 }}>Xác nhận xoá sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xoá sản phẩm <strong>"{deleteTarget?.name}"</strong>? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setDeleteTarget(null)}>Huỷ</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            <DeleteIcon sx={{ fontSize: 16, mr: 0.5 }} /> Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
