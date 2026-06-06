export const CATEGORIES = ['Tất cả', 'Rau củ', 'Trái cây', 'Gạo & Ngũ cốc', 'Gia vị', 'Đặc sản']

export const CATEGORY_ICONS = {
  'Rau củ': 'fa-seedling',
  'Trái cây': 'fa-apple-whole',
  'Gạo & Ngũ cốc': 'fa-wheat-awn',
  'Gia vị': 'fa-pepper-hot',
  'Đặc sản': 'fa-star',
}

export const CATEGORY_COLORS = {
  'Rau củ': { bg: '#e8f5e9', text: '#1b5e20' },
  'Trái cây': { bg: '#fff8e1', text: '#f57f17' },
  'Gạo & Ngũ cốc': { bg: '#fff3e0', text: '#e65100' },
  'Gia vị': { bg: '#fce4ec', text: '#880e4f' },
  'Đặc sản': { bg: '#f3e5f5', text: '#4a148c' },
}

let _uid = 10

export const genId = () => _uid++

export const INITIAL_PRODUCTS = [
  {
    id: 1, name: 'Cải xanh hữu cơ', category: 'Rau củ', price: 18000, unit: 'bó', emoji: '🥦',
    description: 'Rau cải xanh trồng theo tiêu chuẩn VietGAP, không thuốc trừ sâu, không phân bón hóa học, đảm bảo an toàn cho cả gia đình.',
    origin: 'Đà Lạt', stock: 50, featured: true,
  },
  {
    id: 2, name: 'Cà rốt baby Đà Lạt', category: 'Rau củ', price: 25000, unit: 'túi 500g', emoji: '🥕',
    description: 'Cà rốt mini ngọt tự nhiên, giàu vitamin A và beta-carotene, thu hoạch tươi mỗi sáng từ trang trại cao nguyên.',
    origin: 'Lâm Đồng', stock: 30, featured: true,
  },
  {
    id: 3, name: 'Xoài Cát Hòa Lộc', category: 'Trái cây', price: 65000, unit: 'kg', emoji: '🥭',
    description: 'Xoài đặc sản nổi tiếng miền Tây, vị ngọt thơm đặc trưng, thịt vàng, ít xơ. Trồng tự nhiên không hóa chất.',
    origin: 'Tiền Giang', stock: 20, featured: true,
  },
  {
    id: 4, name: 'Gạo ST25 hữu cơ', category: 'Gạo & Ngũ cốc', price: 45000, unit: 'kg', emoji: '🌾',
    description: 'Gạo ST25 - giải nhất gạo ngon nhất thế giới, hạt dài đều, cơm dẻo thơm tự nhiên, canh tác hữu cơ hoàn toàn.',
    origin: 'Sóc Trăng', stock: 100, featured: true,
  },
  {
    id: 5, name: 'Dưa hấu không hạt', category: 'Trái cây', price: 15000, unit: 'kg', emoji: '🍉',
    description: 'Dưa hấu ruột đỏ không hạt, vỏ mỏng, ngọt thanh tự nhiên. Thu hoạch đúng độ chín, vận chuyển cẩn thận.',
    origin: 'Bình Thuận', stock: 40, featured: false,
  },
  {
    id: 6, name: 'Tiêu sọ Phú Quốc', category: 'Gia vị', price: 120000, unit: '100g', emoji: '⚫',
    description: 'Tiêu đặc sản Phú Quốc, thơm nồng đậm vị, hạt đều đẹp. Phơi nắng tự nhiên, không qua xử lý hóa chất.',
    origin: 'Kiên Giang', stock: 25, featured: false,
  },
  {
    id: 7, name: 'Mật ong rừng U Minh', category: 'Đặc sản', price: 180000, unit: 'chai 500ml', emoji: '🍯',
    description: 'Mật ong nguyên chất từ rừng tràm U Minh, không pha tạp, màu vàng óng, vị ngọt thanh, tốt cho sức khoẻ.',
    origin: 'Cà Mau', stock: 15, featured: true,
  },
  {
    id: 8, name: 'Khoai lang mật Vĩnh Long', category: 'Rau củ', price: 22000, unit: 'kg', emoji: '🍠',
    description: 'Khoai lang ngọt, ruột vàng óng, giàu chất xơ và vitamin. Canh tác tự nhiên trên đất phù sa đồng bằng.',
    origin: 'Vĩnh Long', stock: 60, featured: false,
  },
  {
    id: 9, name: 'Nấm linh chi đỏ', category: 'Đặc sản', price: 250000, unit: 'hộp 200g', emoji: '🍄',
    description: 'Nấm linh chi đỏ Đà Lạt tươi, bổ dưỡng, tăng cường miễn dịch. Trồng trong nhà kính kiểm soát nhiệt độ.',
    origin: 'Đà Lạt', stock: 20, featured: false,
  },
  {
    id: 10, name: 'Chanh dây Gia Lai', category: 'Trái cây', price: 35000, unit: 'kg', emoji: '🟡',
    description: 'Chanh dây chín vàng, vị chua ngọt hài hòa, giàu vitamin C. Hái tươi ngày cùng, đóng gói cẩn thận.',
    origin: 'Gia Lai', stock: 35, featured: true,
  },
  {
    id: 11, name: 'Muối ớt Tây Ninh', category: 'Gia vị', price: 55000, unit: 'hũ 200g', emoji: '🧂',
    description: 'Muối ớt đặc sản Tây Ninh, cay nồng tự nhiên, không phẩm màu. Ăn kèm trái cây hoặc làm gia vị nướng.',
    origin: 'Tây Ninh', stock: 40, featured: false,
  },
  {
    id: 12, name: 'Bơ sáp 034 Đắk Lắk', category: 'Trái cây', price: 55000, unit: 'kg', emoji: '🥑',
    description: 'Bơ sáp 034 Đắk Lắk nổi tiếng cả nước, thịt vàng béo ngậy, hạt nhỏ. Thu hoạch đúng độ chín tự nhiên.',
    origin: 'Đắk Lắk', stock: 30, featured: true,
  },
]

export const TESTIMONIALS = [
  {
    id: 1, name: 'Nguyễn Thị Lan', role: 'Nội trợ, TP.HCM', avatar: '👩',
    comment: 'Rau củ tươi ngon, giao nhanh, đóng gói cẩn thận. Mình đã đặt hàng nhiều lần và luôn hài lòng. Sẽ giới thiệu cho bạn bè!',
    rating: 5,
  },
  {
    id: 2, name: 'Trần Văn Hùng', role: 'Chủ nhà hàng, Hà Nội', avatar: '👨',
    comment: 'Nhà hàng tôi đặt rau hữu cơ ở đây đã 1 năm. Chất lượng đồng đều, nguồn gốc rõ ràng, khách rất ưa thích.',
    rating: 5,
  },
  {
    id: 3, name: 'Phạm Thu Hà', role: 'Blogger ẩm thực, Đà Nẵng', avatar: '👩‍💻',
    comment: 'Mật ong U Minh và gạo ST25 ở đây chuẩn xác nhất mình từng dùng. Giá cả hợp lý, dịch vụ chăm sóc khách hàng rất tốt.',
    rating: 5,
  },
]

export const formatPrice = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ'

export const getYouTubeEmbedUrl = (url) => {
  if (!url || !url.trim()) return null
  const patterns = [
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`
  }
  return null
}
