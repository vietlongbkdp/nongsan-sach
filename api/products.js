import { dbConnect } from './_lib/db.js'
import { Product } from './_lib/models.js'

export default async function handler(req, res) {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const products = await Product.find().sort({ createdAt: -1 })
      return res.status(200).json(products)
    }

    if (req.method === 'POST') {
      const product = await Product.create(req.body)
      return res.status(201).json(product)
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
