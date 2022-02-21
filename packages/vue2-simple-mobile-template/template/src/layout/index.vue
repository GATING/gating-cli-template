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
import routes from '@/router/modules/app'
import { primaryColor, secondaryColor } from '@style/variables-export.scss'
export default {
  name: 'GlobalLayout',
  data() {
    return {
      primaryColor,
      secondaryColor,
      routes
    }
  },
  computed: {
    hasMenu() {
      return some(routes, ({ path }) => this.$route.path === path)
    }
  },
  methods: {
    gotoPath(path) {
      if (path === this.$route.path) return
      return this.$router.push(path)
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
