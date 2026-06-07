const router = require('express').Router()
const Setting = require('../models/Setting')

// GET all settings as a flat object { youtubeUrl: '...', siteName: '...' }
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find()
    const obj = {}
    settings.forEach((s) => { obj[s.key] = s.value })
    res.json(obj)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update settings (body: { youtubeUrl: '...', siteName: '...' })
router.put('/', async (req, res) => {
  try {
    const entries = Object.entries(req.body)
    await Promise.all(
      entries.map(([key, value]) =>
        Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
      )
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
