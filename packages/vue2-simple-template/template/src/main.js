import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import CommonForm from '@comp/CommonForm/index.vue'
import CommonTable from '@comp/CommonTable/index.vue'
import CommonPagination from '@comp/CommonPagination/index.vue'
import '@style/global.scss'
import './permission.js'

// 全局过滤器
import filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 默认样式太大了，换成small的
Vue.use(ElementUI, {
  size: 'small'
})
  .component('CommonForm', CommonForm)
  .component('CommonTable', CommonTable)
  .component('CommonPagination', CommonPagination)

Vue.config.productionTip = false
// 开启performance用于性能分析
Vue.config.performance = process.env.NODE_ENV !== 'production'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
