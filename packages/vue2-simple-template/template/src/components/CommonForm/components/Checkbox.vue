<template>
  <el-checkbox-group v-bind="$attrs" v-on="$listeners" :value="value">
    <el-checkbox v-for="item in list" v-bind="item" :key="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import formMixin from './formMixin'
export default {
  mixins: [formMixin]
}
</script>
