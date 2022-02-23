const path = require('path')
const webpack = require('webpack')
const TransformPagesPlugin = require('uni-read-pages')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'uni-app-simple-template'
const isDevelopment = process.env.NODE_ENV === 'development'
const port = process.env.port || process.env.npm_config_port || 8848

// const isH5 = process.env.UNI_PLATFORM.toLocaleLowerCase() === 'h5'

/**
 * vue.config.js
 * @see https://cli.vuejs.org/zh/config/#vue-config-js
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: isDevelopment,
  productionSourceMap: isDevelopment,
  devServer: {
    port,
    open: true,
    disableHostCheck: true,
    // 自带的mocks，如果有接口建议删除
    before: require('./mocks'),
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
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@page': resolve('src/pages'),
        '@util': resolve('src/utils'),
        '@style': resolve('src/styles'),
        '@mixin': resolve('src/mixins'),
        '@plugin': resolve('src/plugins'),
        '@comp': resolve('src/components')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPagesPlugin({
            includes: ['path', 'name', 'aliasPath', 'meta']
          })
          return JSON.stringify(tfPages.routes)
        }, true)
      })
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        // uni-app 这里必须用 prependData
        prependData: `@import "@/styles/variables.scss";@import "@/styles/mixins.scss";@import "@/uni.scss";`
      }
    }
  },
  transpileDependencies: ['uview-ui']
}
