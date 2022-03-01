<template>
  <div class="p-20">
    <van-form ref="loginForm" @submit="login">
      <van-field
        v-model="form.user"
        label="用户名"
        placeholder="用户名"
        :rules="[validateRequired('请输入用户名')]"
      />
      <van-field
        v-model="form.pass"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="[validateRequired('请输入密码')]"
      />
      <div class="mt-20">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { validateRequired as _validateRequired } from '@util/validate'

const route = useRoute()
const router = useRouter()
const store = useStore()

const loginForm = ref(null)
const data = reactive({
  form: {
    user: 'gating',
    pass: '123456'
  },
  redirect: undefined,
  otherQuery: {},
  validateRequired: _validateRequired,
  async login() {
    await loginForm.value.validate()
    const { redirect, otherQuery, form } = data
    await store.dispatch('user/login', form)
    router.replace({ path: redirect || '/', query: otherQuery })
  },
  getOtherQuery(query) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {})
  }
})
const { form, redirect, otherQuery, validateRequired, login } = toRefs(data)
watch(
  route,
  ({ query }) => {
    if (query) {
      data.redirect = query.redirect
      data.otherQuery = data.getOtherQuery(query)
    }
  },
  { immediate: true }
)
</script>
