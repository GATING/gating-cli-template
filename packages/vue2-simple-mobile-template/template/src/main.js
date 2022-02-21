import Vue from 'vue'
import Vant from 'vant'
// 引入全部样式
import 'vant/lib/index.less'
// 桌面端适配,引入模块后自动生效
// import '@vant/touch-emulator'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import './styles/global.scss'

// 全局指令
import inputDirective from './directives/input'
inputDirective(Vue)

// 全局过滤器
import filters from './filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
