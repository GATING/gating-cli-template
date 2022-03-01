<template>
  <div id="layout">
    <router-view />
    <footer v-if="hasMenu" id="app-footer" class="safe-area-inset-bottom">
      <van-tabbar fixed route :active-color="primaryColor" :inactive-color="secondaryColor">
        <van-tabbar-item
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          :icon="route.meta.icon"
        >
          {{ route.meta.title }}
        </van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import { some } from 'lodash'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import routes from '@/router/modules/app'
import { primaryColor, secondaryColor } from '@style/variables-export.module.scss'

export default {
  setup() {
    const route = useRoute()
    const hasMenu = computed(() => some(routes, ({ path }) => route.path === path))

    return {
      primaryColor,
      secondaryColor,
      routes,
      hasMenu
    }
  }
}
</script>

<style lang="scss">
#layout {
  height: 100%;
}
#app-footer {
  height: 50px;
}
</style>
