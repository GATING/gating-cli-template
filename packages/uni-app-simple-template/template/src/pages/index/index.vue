<template>
  <view>
    <image class="logo" src="/static/logo.png" />
    <text class="text-primary" @click="$Router.pushTab({ path: '/my' })">go to my</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  }
}
</script>
