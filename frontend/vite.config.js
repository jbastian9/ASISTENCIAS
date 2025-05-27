import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    root: '.',
    plugins: [vue()],
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './src/assets'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layout': path.resolve(__dirname, './src/layouts'),
        '@views': path.resolve(__dirname, './src/views'),
        '@composables': path.resolve(__dirname, './src/composables'),
        '@router': path.resolve(__dirname, './src/router'),
        '@store': path.resolve(__dirname, './src/store'),
        '@services': path.resolve(__dirname, './src/services'),
        '@tests': path.resolve(__dirname, './src/tests'),
      },
    },
    publicDir: 'public',
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_ORIGEN || 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})