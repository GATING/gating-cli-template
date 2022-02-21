<template>
  <div>
    <van-form @submit="login">
      <van-field
        v-model="form.user"
        label="用户名"
        placeholder="用户名"
        :rules="[validateRequired]"
      />
      <van-field
        v-model="form.pass"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="[validateRequired]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { validateRequired } from '@util/validate'
export default {
  name: 'login-view',
  data() {
    return {
      form: {
        user: 'gating',
        pass: '123456'
      },
      validateRequired,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
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
    async login() {
      await this.$store.dispatch('user/login', this.form)
      this.$router.replace({ path: this.redirect || '/', query: this.otherQuery })
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
