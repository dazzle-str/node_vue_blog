import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000'
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    }
  }
})
