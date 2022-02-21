<template>
  <van-pull-refresh v-model="refreshing" @refresh="refresh">
    <template v-if="list.length || refreshing">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="—— 没有更多了 ——"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="load"
      >
        <slot />
      </van-list>
    </template>
    <template v-else>
      <van-empty :description="description" />
    </template>
  </van-pull-refresh>
</template>

<script>
import { throttle } from 'lodash'
import { post } from '@util/request'
import { removeAllCookie } from '@/utils/auth'

export default {
  name: 'PullRefresh',
  model: {
    prop: 'list',
    event: 'change'
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({
        loading: false
      })
    },
    description: {
      type: String,
      default: '暂无数据'
    },

    // 分页的key
    pageKey: {
      type: String,
      default: 'current'
    },
    sizeKey: {
      type: String,
      default: 'size'
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      current: 1,
      error: false,
      loading: true,
      finished: false,
      refreshing: true
    }
  },
  created() {
    this.load()
  },
  methods: {
    load: throttle(async function () {
      const { params, config, current, url, pageKey, size, sizeKey } = this
      try {
        const { records, pages } = await post(
          url,
          {
            ...params,
            [pageKey]: current,
            [sizeKey]: size
          },
          config
        )
        const len = records.length
        this.$emit('change', [...this.list, ...records])
        this.current++
        this.loading = false
        this.refreshing = false
        if (len < 10 || pages == current) {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.refreshing = false
        this.error = true
        console.error(`下拉刷新组件请求出错啦`, error)

        if (error?.code === 'ERROR30001') {
          removeAllCookie()
          return this.$router.push('/login')
        }
      }
    }, 1000),
    refresh() {
      this.current = 1
      this.error = false
      this.loading = true
      this.finished = false
      this.refreshing = true
      this.$emit('change', [])
      // 避免params比load快
      setTimeout(() => {
        this.load()
      })
    }
  }
}
</script>
