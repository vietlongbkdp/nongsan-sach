import { dbConnect } from './_lib/db.js'
import { Setting } from './_lib/models.js'

export default async function handler(req, res) {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const rows = await Setting.find()
      const obj = Object.fromEntries(rows.map((r) => [r.key, r.value]))
      return res.status(200).json(obj)
    }

    if (req.method === 'PUT') {
      await Promise.all(
        Object.entries(req.body).map(([key, value]) =>
          Setting.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true })
        )
      )
      return res.status(200).json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
