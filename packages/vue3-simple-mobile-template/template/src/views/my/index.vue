<template>
  <div>
    <span v-if="info">{{ info.name }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const { getters } = useStore()
const info = computed(() => getters.info)
</script>
