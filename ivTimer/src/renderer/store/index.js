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
      const obj = { ...initial }
      for (let period of ['second', 'minute', 'hour', 'day', 'month', 'year']) {
        console.log(period)
        switch (period) {
          case 'second':
          case 'minute':
            if (obj[period] > 59) obj[period] = 0
            break
          case 'hour':
            if (obj[period] > 23) obj[period] = 0
            break
          case 'month':
            if (obj[period] > 12) obj[period] = 0
            break
          case 'day':
            switch (obj.month) {
              case 2:
                const vy = obj.year % 4 || (obj.year % 100 === 0 && obj.year % 400) ? 28 : 29
                if (obj.day > vy) obj.day = 1
                break
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                if (obj.day > 31) obj.day = 1
                break
              default:
                if (obj.day > 30) obj.day = 1
                break
            }
            break
        }
      }
      state.tasksList = [{ ...obj }]
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
