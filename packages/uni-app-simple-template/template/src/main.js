import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import store from './store'
import { router, RouterMount } from './router'
import uniPlugin from './plugins/uni'

/**
 * 小程序分享
 * this.$u.mpShare = {
    title: '', // 默认为小程序名称，可自定义
    path: '', // 默认为当前页面路径，一般无需修改，QQ小程序不支持
    // 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
    // 支持PNG及JPG，默认为当前页面的截图
    imageUrl: '' 
  }
 */
import mpShare from 'uview-ui/libs/mixin/mpShare.js'
Vue.mixin(mpShare)

Vue.use(router).use(uView).use(uniPlugin)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif
