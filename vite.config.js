import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from "vite-plugin-html";
import { loadEnv } from 'vite'

// https://vite.dev/config/
export default ((mode) => {

  // loadEnv(mode, process.cwd()).MODE
 
  return defineConfig({
    plugins: [
      vue(),
      vueDevTools(),
      // createHtmlPlugin({
      //   inject: {
      //     data: {
      //       asseturl: mode === 'develop' ? './public/live2dcubismcore.min.js' : './live2dcubismcore.min.js'
      //     }
      //   }
      // })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },

    },
    // assetsInclude: ['**/live2dcubismcore.min.js'], 
    // build: {
    //   rollupOptions: {
    //     external: ['/public/live2dcubismcore.min.js'], // 强制排除打包
    //   },
    // },
    server: {
      proxy: {
        '^/test': {
          target: "http://localhost:5173/",
          rewrite: (path) => path.replace(/^\/test/, '/')
        }
      }
    }
  })
})
