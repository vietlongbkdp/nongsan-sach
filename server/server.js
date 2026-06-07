require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api/products', require('./routes/products'))
app.use('/api/settings', require('./routes/settings'))
app.use('/api/upload', require('./routes/upload'))

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }))

// MongoDB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  })
