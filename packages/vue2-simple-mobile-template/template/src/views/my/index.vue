<template>
  <div>
    <span v-if="info">{{ info.name }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'my-view',
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
