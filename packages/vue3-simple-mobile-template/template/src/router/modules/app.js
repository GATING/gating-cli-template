const router = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'home-o'
    },
    component: () => import('@view/home/index.vue')
  },
  {
    path: '/my',
    name: 'My',
    meta: {
      title: '我的',
      icon: 'user-o'
    },
    component: () => import('@view/my/index.vue')
  }
]
export default router
