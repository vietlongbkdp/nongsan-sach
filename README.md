# 🌿 NôngSản Sạch

Website bán nông sản hữu cơ – React + MUI + Node.js + MongoDB + Cloudinary.

## Cấu trúc project

```
nongsan-sach/
├── src/               # Frontend (React + Vite + MUI)
└── server/            # Backend (Express + MongoDB)
```

## Cài đặt & Chạy

### 1. Frontend
```bash
cp .env.example .env     # Điền VITE_API_URL
npm install
npm run dev              # http://localhost:5173
```

### 2. Backend
```bash
cd server
cp .env.example .env     # Điền MongoDB URI + Cloudinary keys
npm install
npm run dev              # http://localhost:5000
```

## Biến môi trường

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (server/.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nongsan-sach
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=http://localhost:5173
```

## Tính năng

- 🏠 Trang chủ: Hero + YouTube embed + Categories + Featured products
- 🛒 Sản phẩm: Tìm kiếm, lọc danh mục, khoảng giá, sắp xếp
- 🔍 Chi tiết sản phẩm: Gallery ảnh thực tế + zoom + lightbox
- 🛍️ Giỏ hàng: Mã giảm giá, tính phí ship
- 🔐 Admin: CRUD sản phẩm + upload ảnh Cloudinary + cài đặt YouTube

## Admin
- URL: Nhấn nút **Admin** trên navbar
- Mật khẩu: `admin123`

## Mã giảm giá (demo)
`NONGSANSACH10` · `WELCOME20` · `HEALTHY15`
