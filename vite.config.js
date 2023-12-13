import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    terserOptions: {
      compress: {
        // Specify modules you want to exclude from minification
        drop_console: true,
      },
    },
  },
  plugins: [
		vue(),
		vueJsx(),
		vuetify({ autoImport: true }),
	],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': {
      VITE_VUE_APP_MMBOTURL: process.env.VITE_VUE_APP_MMBOTURL,
    }
  }
})
