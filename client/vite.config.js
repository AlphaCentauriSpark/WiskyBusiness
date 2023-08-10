import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'ec2-3-142-194-170.us-east-2.compute.amazonaws.com',
  },
  plugins: [react()],
})
