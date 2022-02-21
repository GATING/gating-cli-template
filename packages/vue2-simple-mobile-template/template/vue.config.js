const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const name = 'vue2-simple-mobile-template'
const port = process.env.port || process.env.npm_config_port || 8848
const isDevelopment = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * vue.config.js
 * @see https://cli.vuejs.org/zh/config/#vue-config-js
 */
module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // 关闭eslint检查
  lintOnSave: isDevelopment,
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    port,
    open: true,
    // 自带的mocks，如果有接口建议删除
    onBeforeSetupMiddleware: require('./mocks'),
    proxy: {
      '/api': {
        target: 'https://test.com/api',
        secure: false, // 如果要验证SSL证书
        changeOrigin: true // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websocket,
        // 不建议pathRewrite，因为如果你这样了，nginx也需要跟着配置
        // 或者你的全局的request也需要跟着配置
        // pathRewrite: {
        //   "^/api": "/"
        // }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~@/styles/variables";
          @import "~@/styles/mixins";
        `
      },
      less: {
        lessOptions: {
          // 修改less变量
          modifyVars: {
            hack: `true; @import "@style/vant-variables.less";`
          }
        }
      }
    }
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@view': resolve('src/views'),
        '@util': resolve('src/utils'),
        '@style': resolve('src/styles'),
        '@plugin': resolve('src/plugins'),
        '@comp': resolve('src/components')
      }
    }
  },
  chainWebpack(config) {
    config.when(!isDevelopment, config => {
      // 删除生产环境下的console和debugger
      config.optimization
        .minimize(true)
        .minimizer('terser')
        .tap(args => {
          let { terserOptions } = args[0]
          terserOptions.compress.drop_console = true
          terserOptions.compress.drop_debugger = true
          return args
        })

      // 内联运行时(runtime.js)文件到index.html，减少请求
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      // 利用 splitChunks 单独打包第三方模块
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs', // 抽离后的名字
            test: /[\\/]node_modules[\\/]/, // 匹配对应目录
            priority: 10, // 优先级，数字越大优先级越高，默认为0
            chunks: 'initial' // 打包规则，通常用initial，标识非动态模块打进该vendor，动态模块优化打包
          },
          vant: {
            name: 'chunk-vant',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, // 模块被引用3次以上的才抽离
            priority: 5,
            reuseExistingChunk: true // 重复使用已经打包过的模块。即，如果之前已经打包过了，则使用之前的模块，而不会进行再次打包
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
})
