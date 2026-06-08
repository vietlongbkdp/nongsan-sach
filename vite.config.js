import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Đảm bảo realm-web không bị bundle nếu còn trong cache
      external: []
    }
  }
})
