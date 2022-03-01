import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 使用jsx
import vueJsx from '@vitejs/plugin-vue-jsx'
// 支持 setup name
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 支持 html 配置
import { createHtmlPlugin } from 'vite-plugin-html'
import viteMock from './mocks'

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  // 拓展process.env
  const env = loadEnv(mode, process.cwd())
  const name = 'vue3-simple-mobile-template'
  const isDevelopment = mode === 'development'
  const port = env.port || process.env.npm_config_port || 8848
  return defineConfig({
    // 开发或生产环境服务的公共基础路，相当于 vue-cli 的 public
    base: '/',
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      createHtmlPlugin({
        minify: true,
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: name
          }
        }
      }),
      viteMock({
        baseURL: env.VITE_BASE_API,
        isDev: command === 'serve'
      })
    ],
    // 定义全局变量
    define: {},
    // 配置路径别名
    resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@view': resolve('src/views'),
        '@util': resolve('src/utils'),
        '@hook': resolve('src/hooks'),
        '@style': resolve('src/styles'),
        '@comp': resolve('src/components')
      }
    },

    // 提供全局 scss 变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/variables";
            @import "@/styles/mixins";
          `
        }
      }
    },
    // 开发服务器选项
    server: {
      port,
      host: true,
      open: false,
      // https: true,
      proxy: {
        '/api': {
          target: 'https://test.com/api',
          changeOrigin: true // 开启代理，在本地创建一个虚拟服务端
          // ws: true, // 是否启用websocket,
          // 不建议rewrite，因为如果你这样了，nginx也需要跟着配置
          // 或者你的全局的request也需要跟着配置
          // rewrite: (url) => url.replace(/^\/api/, ""),
        }
      }
    },
    esbuild: {
      // 删除console和debugger
      pure: isDevelopment ? [] : ['console.log', 'debugger']
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      assetsDir: 'static',
      // minify: 'terser',
      /**
       * 当 minify:'terser' 解开注释
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: !isDevelopment,
      //   },
      // },
      // 关闭 brotliSize显示 可以稍微缩短时间
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    }
  })
}
