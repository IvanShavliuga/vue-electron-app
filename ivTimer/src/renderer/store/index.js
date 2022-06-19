import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

const validateDate = (obj) => {
  for (let period of ['second', 'minute', 'hour', 'day', 'month', 'year']) {
    obj[period] = +obj[period]
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
  obj.done = false
  return obj
}

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
      obj.id = 1
      state.tasksList = [{ ...validateDate(obj) }]
    },
    ADD_TASK (state, task) {
      task.id = state.tasksList.length + 1
      state.tasksList.push({ ...validateDate(task) })
    },
    SET_TASKDONE (state, id) {
      state.tasksList[id - 1].done = true
    }
  },
  actions: {
    initTask ({ commit }, initial) {
      commit('INIT_TASK', initial)
    },
    addTask ({ commit }, obj) {
      commit('ADD_TASK', obj)
    },
    setTaskDone ({ commit }, id) {
      commit('SET_TASKDONE', id)
    }
  },
  getters: {
    tasksList (state) {
      return state.tasksList
    }
  }
})
