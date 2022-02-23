<template>
  <view>
    <view class="fs-20">个人信息</view>
    <text v-if="info">{{ info.name }}</text>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
