import { createApp } from 'vue'
import Vant from 'vant'
// 引入全部样式
import 'vant/lib/index.css'
import store from './store'
import router from './router'
import App from './App.vue'
import '@style/global.scss'
import './permission'

createApp(App).use(store).use(router).use(Vant).mount('#app')
