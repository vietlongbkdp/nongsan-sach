import mongoose from 'mongoose'

// Cache connection across hot-reloads in serverless
let cached = global._mongoose || (global._mongoose = { conn: null, promise: null })

export async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false })
  }
  cached.conn = await cached.promise
  return cached.conn
}
