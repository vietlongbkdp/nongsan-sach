import { useState } from 'react'
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Chip, Avatar, Rating, Paper,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import VerifiedIcon from '@mui/icons-material/Verified'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { useApp } from '../context/AppContext'
import { CATEGORIES, TESTIMONIALS, getYouTubeEmbedUrl } from '../data'

const WHY_US = [
  { icon: 'fa-leaf', title: 'Hữu cơ 100%', desc: 'Tất cả sản phẩm đạt tiêu chuẩn VietGAP và GlobalGAP, không thuốc trừ sâu, không chất bảo quản.', color: '#e8f5e9', iconColor: '#1e6b3c' },
  { icon: 'fa-truck-fast', title: 'Giao hàng nhanh', desc: 'Giao trong ngày nội thành, 1-2 ngày ngoại thành. Đóng gói kỹ càng giữ độ tươi tối đa.', color: '#e3f2fd', iconColor: '#1565c0' },
  { icon: 'fa-rotate-left', title: 'Đổi trả dễ dàng', desc: 'Không hài lòng? Đổi trả miễn phí trong 24 giờ. Cam kết hoàn tiền 100% nếu sản phẩm không đạt.', color: '#fff3e0', iconColor: '#e65100' },
  { icon: 'fa-headset', title: 'Hỗ trợ 24/7', desc: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng. Tư vấn dinh dưỡng và cách bảo quản thực phẩm miễn phí.', color: '#fce4ec', iconColor: '#880e4f' },
]

const CAT_DISPLAY = [
  { name: 'Rau củ', emoji: '🥦', count: '150+ loại' },
  { name: 'Trái cây', emoji: '🍎', count: '80+ loại' },
  { name: 'Gạo & Ngũ cốc', emoji: '🌾', count: '30+ loại' },
  { name: 'Gia vị', emoji: '🌿', count: '60+ loại' },
  { name: 'Đặc sản', emoji: '🍯', count: '45+ loại' },
]

const STATS = [
  { value: '500+', label: 'Sản phẩm', icon: 'fa-basket-shopping' },
  { value: '15.000+', label: 'Khách hàng', icon: 'fa-users' },
  { value: '100%', label: 'Hữu cơ', icon: 'fa-leaf' },
  { value: '50+', label: 'Đối tác nông trại', icon: 'fa-tractor' },
]

export default function Home() {
  const { products, addToCart, youtubeUrl, setPage, loading } = useApp()
  const featured = products.filter((p) => p.featured).slice(0, 8)
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl)

  return (
    <Box>
      {/* ─── HERO ─── */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0d3d21 0%, #1e6b3c 50%, #2d9d5e 100%)',
        position: 'relative', overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(64,145,108,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(82,183,136,0.15) 0%, transparent 50%)',
        },
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: { xs: 6, md: 8 } }}>
          <Grid container spacing={5} alignItems="center">
            {/* Left */}
            <Grid item xs={12} md={6}>
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: 15, color: '#f0a845 !important' }} />}
                label="Chứng nhận VietGAP & GlobalGAP"
                sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white', mb: 3, fontWeight: 600, fontSize: 12.5, height: 30, backdropFilter: 'blur(8px)' }}
              />

              <Typography
                variant="h1"
                sx={{ color: 'white', fontSize: { xs: 34, md: 50, lg: 58 }, fontWeight: 900, lineHeight: 1.15, mb: 2.5 }}
              >
                Nông Sản Sạch
                <Box component="span" sx={{ display: 'block', color: '#74c69d' }}>
                  Tươi Ngon Mỗi Ngày
                </Box>
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: 15, md: 17 }, lineHeight: 1.8, mb: 4, maxWidth: 460 }}>
                Rau củ quả hữu cơ tươi sạch, trực tiếp từ nông trại. Không thuốc trừ sâu, không chất bảo quản – đảm bảo sức khoẻ cho cả gia đình bạn.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setPage('products')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: '#f0a845', color: '#1a2e1a',
                    '&:hover': { bgcolor: '#e09030', boxShadow: '0 6px 20px rgba(240,168,69,0.5)' },
                    fontSize: 15, px: 3.5, py: 1.4,
                  }}
                >
                  Mua ngay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' }, fontSize: 15, px: 3 }}
                  startIcon={<i className="fas fa-truck-fast" style={{ fontSize: 15 }} />}
                >
                  Giao nhanh trong ngày
                </Button>
              </Box>

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: { xs: 2.5, md: 4 }, flexWrap: 'wrap' }}>
                {STATS.map((s) => (
                  <Box key={s.label}>
                    <Typography sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 900, color: 'white', lineHeight: 1 }}>
                      {s.value}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', mt: 0.3 }}>
                      {s.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right – YouTube embed */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                borderRadius: 4, overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                aspectRatio: '16/9', position: 'relative',
                border: '2px solid rgba(255,255,255,0.1)',
              }}>
                {embedUrl ? (
                  <Box
                    component="iframe"
                    src={embedUrl}
                    title="Video giới thiệu NôngSản Sạch"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  />
                ) : (
                  <Box sx={{
                    width: '100%', height: '100%', minHeight: 280,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2,
                    p: 3,
                  }}>
                    <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fab fa-youtube" style={{ color: '#ff0000', fontSize: 36 }} />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700, mb: 0.5 }}>
                        Chưa có video
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                        Vào trang Admin → Cài đặt để nhúng link YouTube
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setPage('admin')}
                      sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', mt: 1 }}
                    >
                      <i className="fas fa-cog" style={{ marginRight: 6, fontSize: 12 }} />
                      Cài đặt
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Trust badges below video */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2.5, flexWrap: 'wrap' }}>
                {[
                  { icon: 'fa-certificate', label: 'VietGAP', color: '#74c69d' },
                  { icon: 'fa-shield-halved', label: 'Đảm bảo hoàn tiền', color: '#74c69d' },
                  { icon: 'fa-truck', label: 'Giao hàng nhanh', color: '#74c69d' },
                ].map((b) => (
                  <Box key={b.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <i className={`fas ${b.icon}`} style={{ color: b.color, fontSize: 13 }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 12.5, fontWeight: 600 }}>{b.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── MARQUEE STRIP ─── */}
      <Box sx={{ bgcolor: '#f0a845', py: 1.2, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', gap: 4, whiteSpace: 'nowrap' }}>
          {[...Array(3)].flatMap(() => [
            '🌱 Giao hàng miễn phí đơn từ 200.000đ', '🍃 100% hữu cơ không thuốc', '🚚 Giao trong ngày nội thành',
            '♻️ Bao bì thân thiện môi trường', '⭐ Đánh giá 4.9/5 từ 10.000+ khách',
          ]).map((t, i) => (
            <Typography key={i} sx={{ fontSize: 13, fontWeight: 700, color: '#1a2e1a', flexShrink: 0 }}>{t}</Typography>
          ))}
        </Box>
      </Box>

      {/* ─── CATEGORIES ─── */}
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: 7 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip label="Danh mục sản phẩm" size="small" sx={{ bgcolor: '#e8f5e9', color: '#1e6b3c', fontWeight: 700, mb: 1.5 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
            Khám phá danh mục
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto' }}>
            Đa dạng sản phẩm hữu cơ từ khắp vùng miền Việt Nam
          </Typography>
        </Box>

        <Grid container spacing={2.5} justifyContent="center">
          {CAT_DISPLAY.map((cat) => (
            <Grid item key={cat.name} xs={6} sm={4} md={2.4}>
              <Card
                onClick={() => setPage('products')}
                sx={{
                  textAlign: 'center', cursor: 'pointer', p: 3,
                  border: '1.5px solid', borderColor: '#e0f0e5',
                  '&:hover': { borderColor: 'primary.light', bgcolor: '#f0fdf4' },
                }}
              >
                <Typography sx={{ fontSize: 40, mb: 1.5 }}>{cat.emoji}</Typography>
                <Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: 14, mb: 0.3 }}>{cat.name}</Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{cat.count}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── FEATURED PRODUCTS ─── */}
      <Box sx={{ bgcolor: 'white', py: 7 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
            <Box>
              <Chip label="Bán chạy nhất" size="small" sx={{ bgcolor: '#fff8e1', color: '#f57f17', fontWeight: 700, mb: 1.5 }} />
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
                Sản phẩm nổi bật
              </Typography>
            </Box>
            <Button endIcon={<ArrowForwardIcon />} onClick={() => setPage('products')} sx={{ fontWeight: 700 }}>
              Xem tất cả
            </Button>
          </Box>
          <Grid container spacing={3}>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                    <ProductCardSkeleton />
                  </Grid>
                ))
              : featured.map((p) => (
                  <Grid item key={p._id || p.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={p} onAdd={addToCart} />
                  </Grid>
                ))
            }
          </Grid>
        </Container>
      </Box>

      {/* ─── WHY US ─── */}
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 }, py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip label="Cam kết của chúng tôi" size="small" sx={{ bgcolor: '#e8f5e9', color: '#1e6b3c', fontWeight: 700, mb: 1.5 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Tại sao chọn NôngSản Sạch?
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {WHY_US.map((w) => (
            <Grid item key={w.title} xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{
                p: 4, borderRadius: 4, bgcolor: w.color, height: '100%',
                border: '1px solid', borderColor: 'rgba(0,0,0,0.04)',
                transition: 'transform 0.25s', '&:hover': { transform: 'translateY(-4px)' },
              }}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: 3,
                  bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 2.5, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}>
                  <i className={`fas ${w.icon}`} style={{ fontSize: 22, color: w.iconColor }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>{w.title}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.7 }}>{w.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── TESTIMONIALS ─── */}
      <Box sx={{ bgcolor: '#f0fdf4', py: 8 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip label="Khách hàng nói gì" size="small" sx={{ bgcolor: '#e8f5e9', color: '#1e6b3c', fontWeight: 700, mb: 1.5 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
              Đánh giá từ khách hàng
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {TESTIMONIALS.map((t) => (
              <Grid item key={t.id} xs={12} md={4}>
                <Card sx={{ p: 3.5, height: '100%', border: '1.5px solid #e0f0e5' }}>
                  <Rating value={t.rating} readOnly size="small" sx={{ mb: 2, color: '#f0a845' }} />
                  <Typography sx={{ color: 'text.primary', fontSize: 14.5, lineHeight: 1.8, mb: 3, fontStyle: 'italic' }}>
                    "{t.comment}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#e8f5e9', fontSize: 22, width: 44, height: 44 }}>{t.avatar}</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{t.name}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: 12.5 }}>{t.role}</Typography>
                    </Box>
                    <VerifiedIcon sx={{ ml: 'auto', color: '#1e6b3c', fontSize: 18 }} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── CTA BANNER ─── */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e6b3c, #40916c)',
        py: 9, textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <Container maxWidth="md">
          <Typography sx={{ fontSize: 44, mb: 1 }}>🌱</Typography>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, mb: 2 }}>
            Bắt đầu ăn sạch hôm nay!
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, mb: 4, maxWidth: 500, mx: 'auto' }}>
            Miễn phí giao hàng lần đầu cho đơn từ 150.000đ. Nhận ngay ưu đãi chào mừng 20%.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setPage('products')}
            sx={{
              bgcolor: '#f0a845', color: '#1a2e1a', fontSize: 16, px: 5, py: 1.6,
              '&:hover': { bgcolor: '#e09030', boxShadow: '0 8px 24px rgba(240,168,69,0.5)' },
            }}
          >
            <i className="fas fa-shopping-basket" style={{ marginRight: 10 }} />
            Mua sắm ngay
          </Button>
        </Container>
      </Box>
    </Box>
  )
}
