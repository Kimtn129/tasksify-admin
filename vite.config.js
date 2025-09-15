import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import eslintPlugin from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import { alias } from './configs/paths.config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/environments/${mode}`, '')

  console.log(`mode:: ${mode} === ${JSON.stringify(env)}`)

  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val
      }
    }, {})
  }

  return {
    server: {
      host: '0.0.0.0',
      port: 5000,
      strictPort: true,
      hmr: {
        port: 5000
      },
      allowedHosts: [
        "083c184f-b0fa-4dce-9928-f185caccf8ba-00-kapmq3qtj1lo.pike.replit.dev"
      ]
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    define: processEnvValues,
    plugins: [
      vue(),
      // eslintPlugin(), // Temporarily disabled for initial setup
      svgLoader(),
      VueDevTools(),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        strictMessage: false,
        include: resolve(dirname(fileURLToPath(import.meta.url)), './public/locales/**')
      })
    ],

    resolve: {
      alias
    }
  }
})
