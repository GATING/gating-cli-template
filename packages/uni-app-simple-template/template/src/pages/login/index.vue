<template>
  <view>
    <u-form :model="form" ref="uForm" :rules="rules">
      <u-form-item label="姓名" prop="user">
        <u-input v-model="form.user" />
      </u-form-item>
      <u-form-item label="密码" prop="pass">
        <u-input v-model="form.pass" type="password" />
      </u-form-item>
    </u-form>
    <u-button @click="submit">提交</u-button>
  </view>
</template>

<script>
import { validateRequired } from '@util/validate'
export default {
  data() {
    return {
      form: {
        user: 'gating',
        pass: '123456'
      },

      rules: {
        name: [validateRequired('请输入姓名')],
        name: [validateRequired('请输入密码')]
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $Route: {
      handler({ query }) {
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    async submit() {
      await this.$refs.uForm.validate()
      await this.$store.dispatch('user/login', this.form)
      this.$Router.replaceAll({ name: this.redirect || '/', query: this.otherQuery })
      this.$toast({
        title: '登录成功'
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
