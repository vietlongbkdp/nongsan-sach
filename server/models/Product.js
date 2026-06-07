const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },      // Cloudinary secure_url
  publicId: { type: String, required: true }, // Cloudinary public_id (for deletion)
}, { _id: false })

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    category:    { type: String, required: true },
    price:       { type: Number, required: true, min: 0 },
    unit:        { type: String, required: true },
    emoji:       { type: String, default: '🥦' },
    images:      { type: [imageSchema], default: [] },
    description: { type: String, default: '' },
    origin:      { type: String, default: '' },
    stock:       { type: Number, default: 0, min: 0 },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
