const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'nongsan-sach/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 1400, height: 1400, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' },
    ],
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp)'))
  },
})

// POST /api/upload  — upload 1 ảnh
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Không có file nào được tải lên' })
  res.json({
    url:      req.file.path,       // secure Cloudinary URL
    publicId: req.file.filename,   // public_id for deletion
  })
})

// DELETE /api/upload  — xóa ảnh trên Cloudinary
router.delete('/', async (req, res) => {
  const { publicId } = req.body
  if (!publicId) return res.status(400).json({ error: 'Thiếu publicId' })
  try {
    await cloudinary.uploader.destroy(publicId)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Error handler for multer
router.use((err, req, res, next) => {
  res.status(400).json({ error: err.message })
})

module.exports = router
