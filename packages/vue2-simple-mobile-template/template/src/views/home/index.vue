<template>
  <div>
    <van-button type="primary">首页</van-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
