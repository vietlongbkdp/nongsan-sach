import { dbConnect } from './_lib/db.js'
import { Product, Setting } from './_lib/models.js'

// Ảnh thật từ Unsplash (free, không cần auth)
const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`

const SAMPLE_PRODUCTS = [
  {
    name: 'Cải xanh hữu cơ Đà Lạt',
    category: 'Rau củ',
    price: 18000,
    unit: 'bó',
    emoji: '🥦',
    origin: 'Đà Lạt',
    stock: 80,
    featured: true,
    description:
      'Rau cải xanh trồng theo tiêu chuẩn VietGAP trên cao nguyên Đà Lạt 1500m. Không thuốc trừ sâu, không phân bón hóa học. Thu hoạch buổi sáng, giao chiều cùng ngày.',
    images: [
      { url: img('1540420773420-3366772f4999'), publicId: 'seed/cai-xanh-1' },
      { url: img('1597362925823-d9bc45c0e1e1'), publicId: 'seed/cai-xanh-2' },
      { url: img('1622206151226-18ca2c9ab4a1'), publicId: 'seed/cai-xanh-3' },
    ],
  },
  {
    name: 'Cà rốt baby Đà Lạt',
    category: 'Rau củ',
    price: 25000,
    unit: 'túi 500g',
    emoji: '🥕',
    origin: 'Lâm Đồng',
    stock: 45,
    featured: true,
    description:
      'Cà rốt mini ngọt tự nhiên, giàu beta-carotene và vitamin A. Trồng trên đất đỏ bazan, tưới bằng nước suối núi. Kích thước đều, màu cam đẹp, thích hợp ăn sống hoặc nấu súp.',
    images: [
      { url: img('1598170845058-32b9d6a5da37'), publicId: 'seed/ca-rot-1' },
      { url: img('1447175008436-054170537434'), publicId: 'seed/ca-rot-2' },
      { url: img('1590868309235-ea34bed7bd7f'), publicId: 'seed/ca-rot-3' },
    ],
  },
  {
    name: 'Xoài Cát Hòa Lộc',
    category: 'Trái cây',
    price: 65000,
    unit: 'kg',
    emoji: '🥭',
    origin: 'Tiền Giang',
    stock: 30,
    featured: true,
    description:
      'Xoài Cát Hòa Lộc - đặc sản số 1 miền Tây Nam Bộ. Vị ngọt thanh, thịt vàng mịn, ít xơ, hương thơm đặc trưng. Trái to đều, không xử lý hóa chất kích thích nở. Thu hoạch tự nhiên khi đạt độ chín.',
    images: [
      { url: img('1553279768-865429fa0078'), publicId: 'seed/xoai-1' },
      { url: img('1601493700631-2b16ec4b4716'), publicId: 'seed/xoai-2' },
      { url: img('1569870499705-504209102861'), publicId: 'seed/xoai-3' },
    ],
  },
  {
    name: 'Gạo ST25 hữu cơ',
    category: 'Gạo & Ngũ cốc',
    price: 45000,
    unit: 'kg',
    emoji: '🌾',
    origin: 'Sóc Trăng',
    stock: 200,
    featured: true,
    description:
      'Gạo ST25 - giải nhất gạo ngon nhất thế giới 2019 & 2023. Hạt dài, trắng trong, cơm dẻo mềm vừa, hương thơm nhẹ đặc trưng. Canh tác hữu cơ, không dùng thuốc trừ sâu hóa học.',
    images: [
      { url: img('1536304993881-ff86d42818a7'), publicId: 'seed/gao-1' },
      { url: img('1586201375761-83865001e31c'), publicId: 'seed/gao-2' },
      { url: img('1574323347407-f5e1ad6d020b'), publicId: 'seed/gao-3' },
    ],
  },
  {
    name: 'Bơ sáp 034 Đắk Lắk',
    category: 'Trái cây',
    price: 55000,
    unit: 'kg',
    emoji: '🥑',
    origin: 'Đắk Lắk',
    stock: 40,
    featured: true,
    description:
      'Bơ 034 Đắk Lắk - giống bơ ngon nổi tiếng cả nước. Thịt vàng béo ngậy, độ béo cao, hạt nhỏ. Thu hoạch khi vỏ chuyển màu, để 2-3 ngày ăn là chuẩn. Không dùng chất kích chín.',
    images: [
      { url: img('1519162808019-7de1683fa2ad'), publicId: 'seed/bo-1' },
      { url: img('1523049673857-eb18f1d7b578'), publicId: 'seed/bo-2' },
      { url: img('1601039642383-5e7a3663a67c'), publicId: 'seed/bo-3' },
    ],
  },
  {
    name: 'Mật ong rừng U Minh',
    category: 'Đặc sản',
    price: 185000,
    unit: 'chai 500ml',
    emoji: '🍯',
    origin: 'Cà Mau',
    stock: 25,
    featured: true,
    description:
      'Mật ong nguyên chất 100% từ rừng tràm U Minh Hạ. Màu vàng hổ phách, vị ngọt thanh, hương thơm đặc trưng hoa tràm. Không pha trộn, không xử lý nhiệt. Kiểm định chất lượng định kỳ.',
    images: [
      { url: img('1587049352851-8d4e89133924'), publicId: 'seed/mat-ong-1' },
      { url: img('1558642452-9d2a7deb7f62'), publicId: 'seed/mat-ong-2' },
      { url: img('1471943038054-fd02a44a9d9d'), publicId: 'seed/mat-ong-3' },
    ],
  },
  {
    name: 'Dưa hấu không hạt Bình Thuận',
    category: 'Trái cây',
    price: 15000,
    unit: 'kg',
    emoji: '🍉',
    origin: 'Bình Thuận',
    stock: 60,
    featured: false,
    description:
      'Dưa hấu ruột đỏ không hạt, vỏ mỏng, tỷ lệ ăn được cao. Vị ngọt mát tự nhiên, giàu nước, thích hợp giải nhiệt mùa hè. Trồng trên đất cát pha, tưới nước giếng khoan sạch.',
    images: [
      { url: img('1587049352846-4a222e784d38'), publicId: 'seed/dua-hau-1' },
      { url: img('1568702846914-96b305d2aaeb'), publicId: 'seed/dua-hau-2' },
      { url: img('1563114773-84221851701b'), publicId: 'seed/dua-hau-3' },
    ],
  },
  {
    name: 'Tiêu sọ Phú Quốc',
    category: 'Gia vị',
    price: 125000,
    unit: '100g',
    emoji: '⚫',
    origin: 'Kiên Giang',
    stock: 35,
    featured: false,
    description:
      'Tiêu sọ Phú Quốc - đặc sản nổi tiếng thế giới. Hạt tròn đều, màu trắng ngà, thơm nồng đậm đà. Phơi nắng tự nhiên 3-4 ngày, không dùng chất tẩy trắng. Chỉ dẫn địa lý được bảo hộ.',
    images: [
      { url: img('1599940824399-43876629a32a'), publicId: 'seed/tieu-1' },
      { url: img('1596040033229-a9821ebd058d'), publicId: 'seed/tieu-2' },
      { url: img('1610348347147-d66ef49a4fe5'), publicId: 'seed/tieu-3' },
    ],
  },
  {
    name: 'Khoai lang mật Vĩnh Long',
    category: 'Rau củ',
    price: 22000,
    unit: 'kg',
    emoji: '🍠',
    origin: 'Vĩnh Long',
    stock: 70,
    featured: false,
    description:
      'Khoai lang mật ruột vàng cam, vị ngọt tự nhiên, giàu chất xơ và vitamin. Canh tác trên đất phù sa đồng bằng sông Cửu Long. Luộc, nướng, chiên đều ngon. Không có thuốc bảo quản.',
    images: [
      { url: img('1620706857370-e1b9770e4960'), publicId: 'seed/khoai-lang-1' },
      { url: img('1598030473862-e68478db8bbc'), publicId: 'seed/khoai-lang-2' },
    ],
  },
  {
    name: 'Chanh dây Gia Lai',
    category: 'Trái cây',
    price: 38000,
    unit: 'kg',
    emoji: '🟡',
    origin: 'Gia Lai',
    stock: 50,
    featured: true,
    description:
      'Chanh dây vỏ vàng chín cây, vị chua ngọt hài hòa, giàu vitamin C. Thu hoạch ngày cùng đóng gói, vận chuyển lạnh. Dùng pha nước, làm bánh, sinh tố đều tuyệt vời.',
    images: [
      { url: img('1604329760661-e71dc83f8f26'), publicId: 'seed/chanh-day-1' },
      { url: img('1566842600175-97dca489844f'), publicId: 'seed/chanh-day-2' },
      { url: img('1597714026271-9b9c9a73ae5d'), publicId: 'seed/chanh-day-3' },
    ],
  },
  {
    name: 'Nấm linh chi đỏ Đà Lạt',
    category: 'Đặc sản',
    price: 260000,
    unit: 'hộp 200g',
    emoji: '🍄',
    origin: 'Đà Lạt',
    stock: 20,
    featured: false,
    description:
      'Nấm linh chi đỏ trồng trong nhà kính kiểm soát nhiệt độ, độ ẩm. Giàu polysaccharide và triterpenoid, tốt cho miễn dịch, gan, tim mạch. Sấy khô nguyên tai, giữ nguyên dưỡng chất.',
    images: [
      { url: img('1504674900247-0877df9cc836'), publicId: 'seed/nam-linh-chi-1' },
      { url: img('1607623814075-a9e52fce6af3'), publicId: 'seed/nam-linh-chi-2' },
    ],
  },
  {
    name: 'Muối ớt Tây Ninh',
    category: 'Gia vị',
    price: 55000,
    unit: 'hũ 200g',
    emoji: '🌶️',
    origin: 'Tây Ninh',
    stock: 45,
    featured: false,
    description:
      'Muối ớt đặc sản Tây Ninh, công thức truyền thống 3 đời. Cay nồng tự nhiên từ ớt hiểm, không phẩm màu, không chất bảo quản. Ăn kèm trái cây, thịt nướng hoặc dùng làm gia vị.',
    images: [
      { url: img('1583663848850-46af132dc08e'), publicId: 'seed/muoi-ot-1' },
      { url: img('1563805042-7f1cbdeb2cdc'), publicId: 'seed/muoi-ot-2' },
    ],
  },
]

const SAMPLE_SETTINGS = [
  { key: 'youtubeUrl', value: 'https://www.youtube.com/watch?v=9sxMUxhQ6tA' },
  { key: 'siteName', value: 'NôngSản Sạch' },
]

export default async function handler(req, res) {
  // Chỉ cho phép POST để tránh vô tình gọi lại
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Dùng POST để seed data',
      hint: 'curl -X POST https://your-domain.vercel.app/api/seed',
    })
  }

  try {
    await dbConnect()

    // Kiểm tra đã có data chưa
    const count = await Product.countDocuments()
    if (count > 0) {
      return res.status(200).json({
        message: `Database đã có ${count} sản phẩm. Thêm ?force=true để seed lại.`,
        count,
      })
    }

    // Force seed nếu có query param
    if (req.query.force === 'true') {
      await Product.deleteMany({})
      await Setting.deleteMany({})
    }

    // Insert products
    const products = await Product.insertMany(SAMPLE_PRODUCTS)

    // Insert settings
    for (const s of SAMPLE_SETTINGS) {
      await Setting.findOneAndUpdate({ key: s.key }, s, { upsert: true })
    }

    res.status(201).json({
      success: true,
      message: `✅ Đã tạo ${products.length} sản phẩm mẫu và ${SAMPLE_SETTINGS.length} cài đặt`,
      products: products.map((p) => ({ id: p._id, name: p.name, images: p.images.length })),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
