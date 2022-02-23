import { includes } from 'lodash'
import { RouterMount, createRouter } from 'uni-simple-router'
import store from '@/store'
import { getToken } from '@util/store'

const scrollInfo = {}

// 白名单，或者设置黑名单
const whiteList = ['/login', '/404', '/401', '/']

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  applet: {
    animationDuration: 1000 / 6 //默认 300ms  v2.0.6+
  },
  // 优雅解锁
  routerErrorEach: (error, router) => {
    /* 
        0 表示 next(false)
        1 表示 next(unknownType)
        2 表示加锁状态，禁止跳转
        3 表示在获取页面栈的时候，页面栈不够level获取
    */
    if (error.type === 3) {
      router.$lockStatus = false
    }
    console.log('跳转出错：', error)
  },
  APP: {
    animation: {
      animationType: 'slide-in-top',
      animationDuration: 300
    },
    loadingPageHook: view => {
      view.hide()
    }
  },
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: '/'
    }
  ],
  h5: {
    scrollBehavior(to, from, savedPosition) {
      const scroll = scrollInfo[to.path]
      if (scroll) {
        return scroll
      }
      return savedPosition
    }
  }
})

//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  // #ifdef H5
  if (from.meta.keepScroll === true) {
    scrollInfo[from.path] = {
      x: window.scrollX,
      y: window.scrollY
    }
  }
  // #endif
  const hasToken = getToken()
  if (hasToken) {
    const info = store.getters.info
    if (info) {
      next()
    } else {
      try {
        await store.dispatch('user/getInfo')
        next({ ...to, name: to.name, NAVTYPE: 'replace' })
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/logout')
        next({
          name: 'login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    }
  } else {
    if (includes(whiteList, to.aliasPath)) {
      next()
    } else {
      router.$lockStatus = false
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        },
        NAVTYPE: 'replaceAll'
      })
    }
  }
})

export { router, RouterMount }
