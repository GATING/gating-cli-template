<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners" :value="value">
    <el-radio v-for="item in list" v-bind="item" :key="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
<script>
import formMixin from './formMixin'
export default {
  mixins: [formMixin]
}
</script>
