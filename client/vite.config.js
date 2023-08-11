import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    // public: 'http://ec2-54-219-164-184.us-west-1.compute.amazonaws.com/',
  },
  plugins: [react()],
});
