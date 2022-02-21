<template>
  <div class="sidebar-container">
    <van-sidebar v-model="current" class="bg-white">
      <van-sidebar-item
        v-for="(sidebar, idx) in list"
        ref="sidebar"
        :key="sidebar.title"
        :title="sidebar.title"
        :badge="badge || getBadge(sidebar)"
        @click="scrollToCurrentContent(idx)"
      />
    </van-sidebar>
    <div ref="sidebarContainer" class="plr-10 pt-10 hp-100 overflow-y">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    badge: {
      type: Number
    },
    getBadge: {
      type: Function,
      default: () => new Function()
    }
  },
  data() {
    return {
      current: 0,
      offset: []
    }
  },
  computed: {
    sidebar({ $refs }) {
      return $refs?.sidebar
    },
    sidebarContent({ sidebarContainer }) {
      return sidebarContainer?.children
    },
    sidebarContainer({ $refs }) {
      return $refs?.sidebarContainer
    }
  },
  mounted() {
    this.sidebarContainer?.addEventListener('scroll', this.scroll)
  },
  destroyed() {
    this.sidebarContainer?.removeEventListener('scroll', this.scroll)
  },
  methods: {
    scrollToCurrentContent(current) {
      this.scrollToCurrentSideBar(current)
      const sidebarContent = this.sidebarContent
      sidebarContent[current].scrollIntoView(true)
    },
    scrollToCurrentSideBar(current) {
      const sidebar = this.sidebar
      sidebar[current].$el.scrollIntoView(true)
    },
    scroll(ev) {
      const sidebarContent = this.sidebarContent
      const len = sidebarContent.length
      // 补齐高度
      let scrollTop = ev.target.scrollTop + 10
      for (let i = 0; i < len; i++) {
        const content = sidebarContent[i]
        const offsetTop = content.offsetTop
        const offsetBottom = offsetTop + content.getBoundingClientRect().height
        if (scrollTop >= offsetTop && scrollTop <= offsetBottom) {
          this.current = i
          this.scrollToCurrentSideBar(i)
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$width: 94px;
.sidebar-container {
  position: relative;
  padding-left: $width;
  ::v-deep {
    .van-sidebar {
      position: absolute;
      left: 0;
      top: 0;
      width: $width;
      height: 100%;
      overflow-y: auto;
      .van-sidebar-item {
        background: #fff;
        padding: 10px 12px;
        color: #666;
        @extend %font-medium;
      }
      .van-sidebar-item--select {
        color: $primary-color;
      }
    }
  }
}
</style>
