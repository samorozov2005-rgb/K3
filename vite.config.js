import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Перед публикацией задайте, например: VITE_BASE_PATH=/my-repository/
  base: process.env.VITE_BASE_PATH || '/',
});
