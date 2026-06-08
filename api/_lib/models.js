import mongoose from 'mongoose'

// ── Product ───────────────────────────────────────────────────────────────────
const imageSchema = new mongoose.Schema(
  { url: String, publicId: String },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    category:    String,
    price:       Number,
    unit:        String,
    emoji:       { type: String, default: '🥦' },
    images:      { type: [imageSchema], default: [] },
    description: String,
    origin:      String,
    stock:       { type: Number, default: 0 },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

// ── Setting ───────────────────────────────────────────────────────────────────
const settingSchema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true },
  value: { type: String, default: '' },
})

// Reuse models across warm invocations
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
export const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema)
