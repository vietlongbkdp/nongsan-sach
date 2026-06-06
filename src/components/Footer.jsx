import { Box, Grid, Typography, TextField, Button, Divider, IconButton } from '@mui/material'
import { useApp } from '../context/AppContext'

const FOOTER_LINKS = {
  'Sản phẩm': ['Rau củ hữu cơ', 'Trái cây tươi', 'Gạo & Ngũ cốc', 'Gia vị đặc sản', 'Đặc sản vùng miền'],
  'Về chúng tôi': ['Câu chuyện thương hiệu', 'Quy trình sản xuất', 'Chứng nhận hữu cơ', 'Đối tác nông trại', 'Tuyển dụng'],
  'Hỗ trợ': ['Chính sách đổi trả', 'Chính sách vận chuyển', 'Hướng dẫn mua hàng', 'Câu hỏi thường gặp', 'Liên hệ'],
}

const SOCIALS = [
  { icon: 'fa-facebook-f', href: '#', color: '#1877f2' },
  { icon: 'fa-instagram', href: '#', color: '#e1306c' },
  { icon: 'fa-youtube', href: '#', color: '#ff0000' },
  { icon: 'fa-tiktok', href: '#', color: '#000' },
]

export default function Footer() {
  const { setPage } = useApp()

  return (
    <Box component="footer" sx={{ bgcolor: '#0d3d21', color: 'white', mt: 0 }}>
      {/* CTA Banner */}
      <Box sx={{ background: 'linear-gradient(90deg, #1e6b3c 0%, #40916c 100%)', py: 5, px: { xs: 3, md: 6 } }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3, justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'white', mb: 0.5 }}>
              Đăng ký nhận ưu đãi & tin tức nông sản
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
              Nhận thông báo giảm giá, sản phẩm mới và mẹo nấu ăn hàng tuần.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Email của bạn..."
              size="small"
              sx={{
                bgcolor: 'white', borderRadius: 2, width: 240,
                '& .MuiOutlinedInput-root': { borderRadius: 2, '& fieldset': { border: 'none' } },
              }}
            />
            <Button variant="contained" sx={{ bgcolor: '#f0a845', color: '#1a2e1a', '&:hover': { bgcolor: '#e09030' }, fontWeight: 700, whiteSpace: 'nowrap' }}>
              <i className="fas fa-paper-plane" style={{ marginRight: 6, fontSize: 13 }} />
              Đăng ký
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main footer */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 6 }, py: 7 }}>
        <Grid container spacing={5}>
          {/* Brand column */}
          <Grid item xs={12} md={3.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
              <Box sx={{
                width: 44, height: 44, borderRadius: 2.5,
                background: 'linear-gradient(135deg, #40916c, #52b788)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fas fa-leaf" style={{ color: 'white', fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontSize: 18, fontWeight: 900, color: 'white' }}>
                NôngSản<span style={{ color: '#52b788' }}>Sạch</span>
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: 13.5, lineHeight: 1.8, mb: 3 }}>
              Chúng tôi kết nối nông dân Việt Nam với người tiêu dùng thông qua chuỗi cung ứng minh bạch, đảm bảo thực phẩm sạch từ trang trại đến bàn ăn.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {SOCIALS.map((s) => (
                <IconButton
                  key={s.icon} size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)', color: 'white',
                    '&:hover': { bgcolor: s.color, transform: 'translateY(-2px)' },
                    transition: 'all 0.25s', width: 36, height: 36,
                  }}
                >
                  <i className={`fab ${s.icon}`} style={{ fontSize: 14 }} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <Grid key={title} item xs={6} md={2.5}>
              <Typography sx={{ fontWeight: 700, color: '#74c69d', mb: 2, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((l) => (
                  <Typography key={l} component="span" sx={{
                    color: 'rgba(255,255,255,0.6)', fontSize: 13.5, cursor: 'pointer',
                    '&:hover': { color: '#74c69d' }, transition: 'color 0.2s',
                  }}>
                    {l}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Contact */}
          <Grid item xs={12} md={2}>
            <Typography sx={{ fontWeight: 700, color: '#74c69d', mb: 2, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Liên hệ
            </Typography>
            {[
              { icon: 'fa-map-marker-alt', text: '123 Đường Nông Nghiệp, Quận 12, TP.HCM' },
              { icon: 'fa-phone', text: '0800 123 456' },
              { icon: 'fa-envelope', text: 'hello@nongsansach.vn' },
              { icon: 'fa-clock', text: 'T2 – CN: 7:00 – 22:00' },
            ].map((item) => (
              <Box key={item.icon} sx={{ display: 'flex', gap: 1.2, mb: 1.5 }}>
                <i className={`fas ${item.icon}`} style={{ color: '#52b788', fontSize: 13, marginTop: 3, flexShrink: 0 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.6 }}>{item.text}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            © 2025 NôngSản Sạch. Bảo lưu mọi quyền.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Điều khoản sử dụng', 'Chính sách bảo mật', 'Cookie'].map((t) => (
              <Typography key={t} sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, cursor: 'pointer', '&:hover': { color: '#74c69d' } }}>
                {t}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <i className="fas fa-shield-halved" style={{ color: '#52b788', fontSize: 14 }} />
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Thanh toán bảo mật SSL</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
