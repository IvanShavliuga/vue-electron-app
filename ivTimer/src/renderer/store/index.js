import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
  state: {
    tasksList: []
  },
  mutations: {
    INIT_TASK (state, initial) {
      state.tasksList = [{ ...initial }]
    }
  },
  actions: {
    initTask ({ commit }, initial) {
      commit('INIT_TASK', initial)
    }
  },
  getters: {
    tasksList (state) {
      return state.tasksList
    }
  }
})
