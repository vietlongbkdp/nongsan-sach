import { useState, useRef } from 'react'
import {
  Box, Container, Typography, Button, TextField, Grid, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  IconButton, Chip, Switch, FormControlLabel, Tab, Tabs, Alert,
  InputAdornment, Tooltip, LinearProgress, CircularProgress,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import { useApp } from '../context/AppContext'
import { uploadAPI } from '../api'
import { formatPrice, CATEGORIES, CATEGORY_COLORS } from '../data'

const ADMIN_PASSWORD = 'admin123'

const EMPTY_FORM = {
  name: '', category: 'Rau củ', price: '', unit: '', emoji: '🥦',
  description: '', origin: '', stock: '', featured: false, images: [],
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

// Image upload zone component
function ImageUploadZone({ images, onUploaded, onDelete }) {
  const fileRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = async (files) => {
    const file = files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Chỉ chấp nhận file ảnh'); return }
    if (file.size > 10 * 1024 * 1024) { setError('File quá lớn (tối đa 10MB)'); return }
    setError(''); setUploading(true); setProgress(0)
    try {
      const result = await uploadAPI.upload(file, setProgress)
      onUploaded(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false); setProgress(0)
    }
  }

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <Box>
      <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: 13, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <i className="fas fa-images" style={{ marginRight: 6 }} /> Ảnh sản phẩm
      </Typography>

      {/* Existing images */}
      {images.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {images.map((img, i) => (
            <Box key={img.publicId || i} sx={{ position: 'relative', width: 80, height: 80 }}>
              <Box component="img" src={img.url} alt=""
                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2, border: '1.5px solid #e0f0e5' }} />
              {i === 0 && (
                <Box sx={{ position: 'absolute', bottom: 2, left: 2, bgcolor: 'rgba(30,107,60,0.85)', borderRadius: 0.8, px: 0.6, py: 0.2 }}>
                  <Typography sx={{ fontSize: 9, color: 'white', fontWeight: 700 }}>CHÍNH</Typography>
                </Box>
              )}
              <IconButton size="small" onClick={() => onDelete(img, i)}
                sx={{ position: 'absolute', top: -6, right: -6, bgcolor: '#d32f2f', color: 'white', width: 20, height: 20, '&:hover': { bgcolor: '#b71c1c' } }}>
                <CloseIcon sx={{ fontSize: 12 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Drop zone */}
      <Box
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => !uploading && fileRef.current?.click()}
        sx={{
          border: `2px dashed ${dragOver ? '#1e6b3c' : '#b7e4c7'}`,
          borderRadius: 3, p: 3, textAlign: 'center', cursor: uploading ? 'default' : 'pointer',
          bgcolor: dragOver ? '#f0fdf4' : 'transparent',
          transition: 'all 0.2s',
          '&:hover': { bgcolor: '#f0fdf4', borderColor: '#40916c' },
        }}
      >
        {uploading ? (
          <Box>
            <CircularProgress size={28} sx={{ color: 'primary.main', mb: 1 }} />
            <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 1, mb: 0.5 }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Đang tải lên... {progress}%</Typography>
          </Box>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 32, color: '#40916c', mb: 1 }} />
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Kéo thả ảnh vào đây</Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>hoặc nhấn để chọn · JPG, PNG, WebP · Tối đa 10MB</Typography>
          </>
        )}
      </Box>
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFiles(e.target.files)} />
    </Box>
  )
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, adminLoggedIn, setAdminLoggedIn, youtubeUrl, siteName, saveSettings } = useApp()

  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [ytInput, setYtInput] = useState(youtubeUrl)
  const [siteNameInput, setSiteNameInput] = useState(siteName)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [settingsSaving, setSettingsSaving] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAdminLoggedIn(true); setPwError('') }
    else setPwError('Mật khẩu không đúng!')
  }

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const openAdd = () => { setForm({ ...EMPTY_FORM, images: [] }); setEditingId(null); setFormError(''); setEditOpen(true) }
  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), unit: p.unit, emoji: p.emoji || '🥦', description: p.description || '', origin: p.origin || '', stock: String(p.stock), featured: p.featured || false, images: p.images || [] })
    setEditingId(p._id); setFormError(''); setEditOpen(true)
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.unit.trim() || !form.stock) {
      setFormError('Vui lòng điền đủ: Tên, Giá, Đơn vị, Tồn kho'); return
    }
    setSaving(true); setFormError('')
    try {
      const data = { ...form, price: Number(form.price), stock: Number(form.stock) }
      if (editingId) await updateProduct(editingId, data)
      else await addProduct(data)
      setEditOpen(false); setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2500)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteTarget._id)
      setDeleteTarget(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveSettings = async () => {
    setSettingsSaving(true)
    try {
      await saveSettings({ youtubeUrl: ytInput, siteName: siteNameInput })
      setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2500)
    } finally {
      setSettingsSaving(false)
    }
  }

  // Image handlers in form
  const onImageUploaded = (result) => setField('images', [...form.images, { url: result.url, publicId: result.publicId }])
  const onImageDelete = async (img, idx) => {
    try { if (img.publicId) await uploadAPI.remove(img.publicId) } catch (_) {}
    setField('images', form.images.filter((_, i) => i !== idx))
  }

  const filtered = products.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.includes(search))

  // ── LOGIN ──
  if (!adminLoggedIn) return (
    <Box sx={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Paper elevation={0} sx={{ maxWidth: 420, width: '100%', p: 5, borderRadius: 4, border: '1.5px solid #e0f0e5' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 68, height: 68, borderRadius: 3, background: 'linear-gradient(135deg, #1e6b3c, #40916c)', mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Trang Quản Trị</Typography>
          <Typography sx={{ color: 'text.secondary', mt: 0.5, fontSize: 14 }}>Nhập mật khẩu để tiếp tục</Typography>
        </Box>
        <Box component="form" onSubmit={handleLogin}>
          <TextField fullWidth label="Mật khẩu" type="password" value={pw} onChange={(e) => { setPw(e.target.value); setPwError('') }}
            error={!!pwError} helperText={pwError} placeholder="••••••••" sx={{ mb: 3 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }} />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.4, fontWeight: 700, fontSize: 15 }}>
            <i className="fas fa-sign-in-alt" style={{ marginRight: 8 }} /> Đăng nhập
          </Button>
          <Typography sx={{ textAlign: 'center', fontSize: 12, color: 'text.secondary', mt: 2 }}>
            Demo: <code style={{ background: '#f0fdf4', padding: '2px 6px', borderRadius: 4, color: '#1e6b3c' }}>admin123</code>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )

  // ── DASHBOARD ──
  const catCounts = CATEGORIES.slice(1).map((c) => ({ cat: c, count: products.filter((p) => p.category === c).length }))

  return (
    <Box sx={{ bgcolor: '#f7fdf4', minHeight: '100vh' }}>
      <Box sx={{ background: 'linear-gradient(135deg, #0d3d21, #1e6b3c)', py: 4 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 900 }}>
              <i className="fas fa-chart-line" style={{ marginRight: 12, opacity: 0.8 }} />Bảng Quản Trị
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 13.5, mt: 0.3 }}>NôngSản Sạch – Admin Dashboard</Typography>
          </Box>
          <Button variant="outlined" startIcon={<LogoutIcon />} onClick={() => setAdminLoggedIn(false)}
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}>
            Đăng xuất
          </Button>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
        {saveSuccess && <Alert severity="success" sx={{ mb: 3 }}>✅ Lưu thành công!</Alert>}

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 4, '& .MuiTab-root': { fontWeight: 700, fontSize: 14, textTransform: 'none', minWidth: 140 }, '& .Mui-selected': { color: 'primary.main' }, '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 3, borderRadius: '3px 3px 0 0' } }}>
          <Tab label={<span><i className="fas fa-gauge" style={{ marginRight: 8 }} />Tổng quan</span>} />
          <Tab label={<span><i className="fas fa-boxes-stacked" style={{ marginRight: 8 }} />Sản phẩm ({products.length})</span>} />
          <Tab label={<span><i className="fas fa-gear" style={{ marginRight: 8 }} />Cài đặt</span>} />
        </Tabs>

        {/* ── TAB 0: OVERVIEW ── */}
        {tab === 0 && (
          <Box>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              <Grid item xs={6} md={3}><StatCard icon="fa-boxes-stacked" label="Tổng sản phẩm" value={products.length} color="#1e6b3c" /></Grid>
              <Grid item xs={6} md={3}><StatCard icon="fa-star" label="Sản phẩm nổi bật" value={products.filter((p) => p.featured).length} color="#f0a845" /></Grid>
              <Grid item xs={6} md={3}><StatCard icon="fa-images" label="Tổng ảnh" value={products.reduce((s, p) => s + (p.images?.length || 0), 0)} color="#1565c0" /></Grid>
              <Grid item xs={6} md={3}><StatCard icon="fa-warehouse" label="Tổng tồn kho" value={products.reduce((s, p) => s + p.stock, 0)} color="#880e4f" /></Grid>
            </Grid>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Sản phẩm theo danh mục</Typography>
            <Grid container spacing={2}>
              {catCounts.map(({ cat, count }) => {
                const cc = CATEGORY_COLORS[cat] || { bg: '#f5f5f5', text: '#333' }
                return (
                  <Grid item xs={6} sm={4} md={2} key={cat}>
                    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: cc.bg, textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <Typography sx={{ fontSize: 22, fontWeight: 900, color: cc.text }}>{count}</Typography>
                      <Typography sx={{ fontSize: 12, color: cc.text, fontWeight: 600 }}>{cat}</Typography>
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
              <TextField size="small" placeholder="Tìm theo tên, danh mục..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ width: 300 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }} />
              <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd} sx={{ px: 3 }}>Thêm sản phẩm</Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1.5px solid', borderColor: '#e0f0e5', borderRadius: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Sản phẩm</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Danh mục</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Giá</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Đơn vị</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Ảnh</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Tồn kho</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Nổi bật</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((p) => {
                    const cc = CATEGORY_COLORS[p.category] || { bg: '#f5f5f5', text: '#333' }
                    const firstImg = p.images?.[0]?.url
                    return (
                      <TableRow key={p._id} sx={{ '&:hover': { bgcolor: '#f8fdf8' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 44, height: 44, borderRadius: 2, overflow: 'hidden', bgcolor: cc.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: firstImg ? 'inherit' : 22 }}>
                              {firstImg ? <Box component="img" src={firstImg} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : p.emoji}
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{p.name}</Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{p.origin}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell><Chip label={p.category} size="small" sx={{ bgcolor: cc.bg, color: cc.text, fontWeight: 700, fontSize: 11 }} /></TableCell>
                        <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{formatPrice(p.price)}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>{p.unit}</TableCell>
                        <TableCell>
                          <Chip label={`${p.images?.length || 0} ảnh`} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 600, fontSize: 11 }}
                            icon={<i className="fas fa-images" style={{ fontSize: 11, color: '#1565c0', marginLeft: 6 }} />} />
                        </TableCell>
                        <TableCell><Chip label={p.stock} size="small" color={p.stock < 10 ? 'error' : p.stock < 30 ? 'warning' : 'success'} variant="outlined" sx={{ fontWeight: 700, minWidth: 44 }} /></TableCell>
                        <TableCell><Chip label={p.featured ? '⭐ Có' : 'Không'} size="small" sx={{ bgcolor: p.featured ? '#fff8e1' : '#f5f5f5', color: p.featured ? '#f57f17' : '#888', fontWeight: 600, fontSize: 11 }} /></TableCell>
                        <TableCell align="center">
                          <Tooltip title="Chỉnh sửa"><IconButton size="small" onClick={() => openEdit(p)} sx={{ color: 'primary.main', mr: 0.5 }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                          <Tooltip title="Xoá"><IconButton size="small" onClick={() => setDeleteTarget(p)} sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
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
            {settingsSaved && <Alert severity="success" sx={{ mb: 3 }}>✅ Đã lưu cài đặt!</Alert>}
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, border: '1.5px solid #e0f0e5', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                <i className="fab fa-youtube" style={{ color: '#ff0000', marginRight: 8 }} />Video Banner (YouTube)
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 13.5, mb: 2.5 }}>Nhúng video YouTube vào banner trang chủ.</Typography>
              <TextField fullWidth label="Link YouTube" placeholder="https://www.youtube.com/watch?v=..." value={ytInput} onChange={(e) => setYtInput(e.target.value)} sx={{ mb: 2 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><i className="fab fa-youtube" style={{ color: '#ff0000', fontSize: 18 }} /></InputAdornment> }}
                helperText="Hỗ trợ: youtube.com/watch?v=... · youtu.be/..." />
              {ytInput && (
                <Box sx={{ borderRadius: 2, overflow: 'hidden', aspectRatio: '16/9', mb: 2, bgcolor: '#000' }}>
                  <iframe src={`https://www.youtube.com/embed/${ytInput.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1] || ''}?rel=0`}
                    title="Preview" style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                </Box>
              )}
            </Paper>
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, border: '1.5px solid #e0f0e5', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                <i className="fas fa-store" style={{ color: '#1e6b3c', marginRight: 8 }} />Thông tin cửa hàng
              </Typography>
              <TextField fullWidth label="Tên website" value={siteNameInput} onChange={(e) => setSiteNameInput(e.target.value)} />
            </Paper>
            <Button variant="contained" size="large" onClick={handleSaveSettings} disabled={settingsSaving} sx={{ px: 4 }}>
              {settingsSaving ? <CircularProgress size={18} sx={{ color: 'white', mr: 1 }} /> : <i className="fas fa-save" style={{ marginRight: 8 }} />}
              Lưu cài đặt
            </Button>
          </Box>
        )}
      </Container>

      {/* ADD/EDIT DIALOG */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>{editingId ? '✏️ Chỉnh sửa sản phẩm' : '➕ Thêm sản phẩm mới'}</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: '80vh' }}>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={8}><TextField fullWidth required label="Tên sản phẩm *" value={form.name} onChange={(e) => setField('name', e.target.value)} /></Grid>
            <Grid item xs={4}><TextField fullWidth label="Emoji" value={form.emoji} onChange={(e) => setField('emoji', e.target.value)} inputProps={{ maxLength: 2 }} /></Grid>
            <Grid item xs={6}>
              <TextField select fullWidth label="Danh mục *" value={form.category} onChange={(e) => setField('category', e.target.value)} SelectProps={{ native: true }}>
                {CATEGORIES.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
              </TextField>
            </Grid>
            <Grid item xs={6}><TextField fullWidth required label="Xuất xứ *" value={form.origin} onChange={(e) => setField('origin', e.target.value)} /></Grid>
            <Grid item xs={4}><TextField fullWidth required label="Giá (đ) *" type="number" value={form.price} onChange={(e) => setField('price', e.target.value)} inputProps={{ min: 0 }} /></Grid>
            <Grid item xs={4}><TextField fullWidth required label="Đơn vị *" value={form.unit} onChange={(e) => setField('unit', e.target.value)} placeholder="kg, bó…" /></Grid>
            <Grid item xs={4}><TextField fullWidth required label="Tồn kho *" type="number" value={form.stock} onChange={(e) => setField('stock', e.target.value)} inputProps={{ min: 0 }} /></Grid>
            <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Mô tả sản phẩm" value={form.description} onChange={(e) => setField('description', e.target.value)} /></Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Switch checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} color="primary" />}
                label={<Typography sx={{ fontWeight: 600 }}>Sản phẩm nổi bật</Typography>} />
            </Grid>
            <Grid item xs={12}>
              <ImageUploadZone images={form.images} onUploaded={onImageUploaded} onDelete={onImageDelete} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="outlined" onClick={() => setEditOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ px: 3 }}>
            {saving ? <CircularProgress size={18} sx={{ color: 'white', mr: 1 }} /> : <i className="fas fa-save" style={{ marginRight: 6 }} />}
            {editingId ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRM */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 800 }}>Xác nhận xoá sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc muốn xoá <strong>"{deleteTarget?.name}"</strong>? Hành động này không thể hoàn tác.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setDeleteTarget(null)}>Huỷ</Button>
          <Button variant="contained" color="error" onClick={handleDelete}><DeleteIcon sx={{ fontSize: 16, mr: 0.5 }} />Xoá</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
