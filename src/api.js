// Tất cả /api/* requests đều đến Vercel Serverless Functions
// Cloudinary upload trực tiếp từ browser (unsigned preset)

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

async function req(path, options = {}) {
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

// ── Products ──────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: ()         => req('/api/products'),
  create: (body)     => req('/api/products', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => req(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id)       => req(`/api/products/${id}`, { method: 'DELETE' }),
}

// ── Settings ──────────────────────────────────────────────────────────────────
export const settingsAPI = {
  get:    ()     => req('/api/settings'),
  update: (body) => req('/api/settings', { method: 'PUT', body: JSON.stringify(body) }),
}

// ── Cloudinary unsigned upload thẳng từ browser ───────────────────────────────
export const uploadAPI = {
  upload: (file, onProgress) =>
    new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', UPLOAD_PRESET)
      fd.append('folder', 'nongsan-sach/products')

      const xhr = new XMLHttpRequest()
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`)
      if (onProgress) xhr.upload.onprogress = (e) => onProgress(Math.round(e.loaded / e.total * 100))
      xhr.onload = () => {
        const d = JSON.parse(xhr.responseText)
        if (xhr.status >= 400) reject(new Error(d.error?.message || 'Upload thất bại'))
        else resolve({ url: d.secure_url, publicId: d.public_id })
      }
      xhr.onerror = () => reject(new Error('Lỗi kết nối'))
      xhr.send(fd)
    }),

  remove: async () => {}, // Xóa ảnh từ Cloudinary Dashboard
}
