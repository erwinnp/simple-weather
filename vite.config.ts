import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['VITE_API_URL', 'VITE_API_KEY'])],
});
