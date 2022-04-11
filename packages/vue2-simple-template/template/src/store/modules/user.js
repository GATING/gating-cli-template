import router from '@/router'
import { getInfo, login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: getToken(),
  info: null
}

const actions = {
  // 登录
  async login({ commit, dispatch }, info) {
    try {
      const { token } = await login(info)
      commit('SET_TOKEN', token)
      await dispatch('getInfo')
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async getInfo({ commit }) {
    try {
      const user = await getInfo()
      commit('SET_INFO', user)
    } catch (err) {
      return Promise.reject(err)
    }
  },

  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_INFO', null)
    removeToken()
    router.push('/login')
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  SET_INFO(state, info) {
    state.info = info
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
