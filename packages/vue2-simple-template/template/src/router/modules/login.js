const router = {
  path: '/login',
  name: '/login',
  meta: {
    title: '登录'
  },
  component: () => import('@view/login/index.vue')
}

export default router
