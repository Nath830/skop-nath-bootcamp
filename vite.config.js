import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Hébergement GitHub Pages sous /skop-nath-bootcamp/
  base: '/skop-nath-bootcamp/',
});
