# 🌿 NôngSản Sạch

Website bán nông sản hữu cơ – **Frontend only**: React + MUI + MongoDB Atlas (Realm) + Cloudinary.

## Cài đặt & Chạy

```bash
npm install
npm run dev
```

## Biến môi trường (.env)

```env
VITE_REALM_APP_ID=nongsan-sach-xxxxx
VITE_CLOUDINARY_CLOUD_NAME=didkjy87q
VITE_CLOUDINARY_UPLOAD_PRESET=nongsan_unsigned
```

## Setup MongoDB Atlas App Services

1. Vào **cloud.mongodb.com** → **App Services** → **Create a New App**
2. Chọn cluster của bạn → Đặt tên app (vd: `nongsan-sach`)
3. **Authentication** → Enable **Anonymous**
4. **Rules** → Collections `products` và `settings`:
   - Role: `readAndWriteAll` hoặc Custom rule cho phép read/write
5. **Deploy** app → Copy **App ID** (dạng `nongsan-sach-abcde`)
6. Dán App ID vào `VITE_REALM_APP_ID`

## Setup Cloudinary Unsigned Preset

1. **Cloudinary Dashboard** → Settings → **Upload**
2. Scroll xuống **Upload presets** → **Add upload preset**
3. **Signing mode**: `Unsigned`
4. Copy preset name → dán vào `VITE_CLOUDINARY_UPLOAD_PRESET`

## Admin
- Mật khẩu: `admin123`
- Upload ảnh trực tiếp lên Cloudinary
- Mọi thay đổi sản phẩm lưu thẳng MongoDB

## Mã giảm giá (demo)
`NONGSANSACH10` · `WELCOME20` · `HEALTHY15`
