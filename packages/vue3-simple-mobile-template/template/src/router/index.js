import { flatten, keys } from 'lodash'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const rts = import.meta.globEager('./modules/*.js')
let pageRoutes = flatten(keys(rts).map(key => rts[key].default))

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: pageRoutes
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
