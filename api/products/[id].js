import { dbConnect } from '../_lib/db.js'
import { Product } from '../_lib/models.js'

export default async function handler(req, res) {
  try {
    await dbConnect()
    const { id } = req.query

    if (req.method === 'GET') {
      const product = await Product.findById(id)
      if (!product) return res.status(404).json({ error: 'Không tìm thấy' })
      return res.status(200).json(product)
    }

    if (req.method === 'PUT') {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
      if (!product) return res.status(404).json({ error: 'Không tìm thấy' })
      return res.status(200).json(product)
    }

    if (req.method === 'DELETE') {
      await Product.findByIdAndDelete(id)
      return res.status(200).json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
