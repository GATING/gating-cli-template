const router = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'home-o'
    },
    component: () => import('@view/home/index.vue')
  }
]
export default router
