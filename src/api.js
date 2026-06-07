import * as Realm from 'realm-web'

// ── Realm init ────────────────────────────────────────────────────────────────
const APP_ID      = import.meta.env.VITE_REALM_APP_ID
const DB_NAME     = 'nongsan-sach'
const CLOUD_NAME  = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const app = new Realm.App({ id: APP_ID })
const { BSON: { ObjectId } } = Realm

let _user = null
let _mongo = null

async function init() {
  if (_user?.isLoggedIn) return
  _user = await app.logIn(Realm.Credentials.anonymous())
  _mongo = _user.mongoClient('mongodb-atlas')
}

const col = (name) => _mongo.db(DB_NAME).collection(name)

const toOid = (id) => {
  try { return typeof id === 'string' ? new ObjectId(id) : id } catch { return id }
}

// Normalize _id to string for React state
const norm = (doc) => {
  if (!doc) return doc
  if (Array.isArray(doc)) return doc.map(norm)
  return { ...doc, _id: doc._id?.toString?.() ?? doc._id }
}

// ── Products ──────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: async () => {
    await init()
    const docs = await col('products').find({})
    return norm(docs).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  create: async (data) => {
    await init()
    const doc = { ...data, createdAt: new Date(), updatedAt: new Date() }
    const { insertedId } = await col('products').insertOne(doc)
    return norm({ ...doc, _id: insertedId })
  },

  update: async (id, data) => {
    await init()
    await col('products').updateOne(
      { _id: toOid(id) },
      { $set: { ...data, updatedAt: new Date() } }
    )
    return norm(await col('products').findOne({ _id: toOid(id) }))
  },

  remove: async (id) => {
    await init()
    await col('products').deleteOne({ _id: toOid(id) })
  },
}

// ── Settings ──────────────────────────────────────────────────────────────────
export const settingsAPI = {
  get: async () => {
    await init()
    const rows = await col('settings').find({})
    return Object.fromEntries(rows.map((r) => [r.key, r.value]))
  },

  update: async (data) => {
    await init()
    await Promise.all(
      Object.entries(data).map(([key, value]) =>
        col('settings').updateOne(
          { key },
          { $set: { key, value, updatedAt: new Date() } },
          { upsert: true }
        )
      )
    )
  },
}

// ── Cloudinary upload (unsigned) ──────────────────────────────────────────────
export const uploadAPI = {
  upload: (file, onProgress) =>
    new Promise((resolve, reject) => {
      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        reject(new Error('Thiếu VITE_CLOUDINARY_CLOUD_NAME hoặc VITE_CLOUDINARY_UPLOAD_PRESET trong .env'))
        return
      }
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', UPLOAD_PRESET)
      fd.append('folder', 'nongsan-sach/products')

      const xhr = new XMLHttpRequest()
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`)
      if (onProgress) xhr.upload.onprogress = (e) => onProgress(Math.round((e.loaded / e.total) * 100))
      xhr.onload = () => {
        const d = JSON.parse(xhr.responseText)
        if (xhr.status >= 400) reject(new Error(d.error?.message || 'Upload thất bại'))
        else resolve({ url: d.secure_url, publicId: d.public_id })
      }
      xhr.onerror = () => reject(new Error('Lỗi kết nối khi upload'))
      xhr.send(fd)
    }),

  // Xóa ảnh từ frontend cần admin API key — không an toàn để expose
  // → quản lý xóa ảnh từ Cloudinary Dashboard
  remove: async (publicId) => {
    console.info('[Cloudinary] Ảnh cần xóa thủ công từ dashboard:', publicId)
  },
}
