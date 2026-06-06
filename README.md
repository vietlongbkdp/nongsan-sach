# 🌿 NôngSản Sạch – Website Bán Nông Sản Hữu Cơ

Website bán nông sản sạch hiện đại, xây dựng với React + MUI + Font Awesome.

## Tính năng

- 🏠 **Trang chủ**: Hero banner với nhúng video YouTube, danh mục, sản phẩm nổi bật, đánh giá khách hàng
- 🛒 **Sản phẩm**: Lọc theo danh mục, tìm kiếm, khoảng giá, sắp xếp
- 🛍️ **Giỏ hàng**: Thêm/bớt số lượng, mã giảm giá, thanh toán
- 🔐 **Trang Admin**: Quản lý sản phẩm (thêm/sửa/xoá), cài đặt link YouTube

## Cài đặt & Chạy

```bash
npm install
npm run dev
```

Mở trình duyệt: http://localhost:5173

## Đăng nhập Admin

- URL: Nhấn nút **Admin** trên navbar
- Mật khẩu: `admin123`

## Nhúng Video YouTube

1. Đăng nhập Admin
2. Vào tab **Cài đặt**
3. Dán link YouTube vào ô "Link YouTube"
4. Nhấn **Lưu cài đặt**

Hỗ trợ các định dạng:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Mã giảm giá (demo)

| Mã | Giảm giá |
|----|----------|
| `NONGSANSACH10` | 10% |
| `WELCOME20` | 20% |
| `HEALTHY15` | 15% |

## Stack

- **React** 18 + Vite
- **MUI** (Material UI) v5
- **Font Awesome** 6.5 (CDN)
- **Be Vietnam Pro** (Google Fonts)
- State management: React Context
