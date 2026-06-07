const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

// ── Products ─────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: ()           => req('/api/products'),
  getOne: (id)         => req(`/api/products/${id}`),
  create: (body)       => req('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  update: (id, body)   => req(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  remove: (id)         => req(`/api/products/${id}`, { method: 'DELETE' }),
}

// ── Settings ──────────────────────────────────────────────────────────────────
export const settingsAPI = {
  get:    ()     => req('/api/settings'),
  update: (body) => req('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
}

// ── Upload ────────────────────────────────────────────────────────────────────
export const uploadAPI = {
  upload: (file, onProgress) => {
    const fd = new FormData()
    fd.append('image', file)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `${BASE}/api/upload`)
      if (onProgress) xhr.upload.onprogress = (e) => onProgress(Math.round((e.loaded / e.total) * 100))
      xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        if (xhr.status >= 400) reject(new Error(data.error))
        else resolve(data)
      }
      xhr.onerror = () => reject(new Error('Upload thất bại'))
      xhr.send(fd)
    })
  },
  remove: (publicId) => req('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId }) }),
}
