const router = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '้ฆ้กต',
      icon: 'home-o'
    },
    component: () => import('@view/home/index.vue')
  },
  {
    path: '/my',
    name: 'My',
    meta: {
      title: 'ๆ็',
      icon: 'user-o'
    },
    component: () => import('@view/my/index.vue')
  }
]
export default router
