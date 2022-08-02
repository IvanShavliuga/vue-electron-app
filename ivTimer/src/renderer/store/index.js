import Vue from 'vue'
import Vuex from 'vuex'
// import { createLocalStore } from '@/utils/local-store'
// import { ipcRenderer } from 'electron'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

// const localStore = createLocalStore()

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
  if (obj.id === undefined) obj.id = ~~(Math.random() * 100000)
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
    tasksList: [],
    options: {
      alwaysOnTop: false,
      hour: true,
      test: true
    }
  },
  mutations: {
    INIT_TASK (state, initial) {
      initial.done = false
      state.tasksList = [{ ...validateDate(initial) }]
    },
    ADD_TASK (state, task) {
      task.done = false
      state.tasksList.push({ ...validateDate(task) })
      // localStore.set('tasksList', JSON.stringify(state.tasksList))
    },
    CHANGE_TASK (state, task) {
      const idFind = state.tasksList.findIndex(el => el.id === task.id)
      state.tasksList[idFind] = { ...validateDate(task) }
      // localStore.set('tasksList', JSON.stringify(state.tasksList))
    },
    SET_TASKDONE (state, id) {
      const idFind = state.tasksList.findIndex(el => el.id === id)
      state.tasksList[idFind].done = true
    },
    DELETE_TASK (state, id) {
      const idFind = state.tasksList.findIndex(el => el.id === +id)
      state.tasksList.splice(idFind, 1)
      // localStore.set('tasksList', JSON.stringify(state.tasksList))
    },
    SET_OPTIONS (state, options) {
      state.options = options
      // localStore.set('options', JSON.stringify(options))
      // ipcRenderer.send('toggle-alwaysOnTop', !options.alwaysOnTop)
    }
  },
  actions: {
    initTask ({ commit }, initial) {
      commit('INIT_TASK', { ...initial })
    },
    addTask ({ commit }, obj) {
      commit('ADD_TASK', { ...obj })
    },
    setOptions ({ commit }, options) {
      commit('SET_OPTIONS', options)
    },
    changeTask ({ commit }, obj) {
      commit('CHANGE_TASK', obj)
    },
    deleteTask ({ commit }, id) {
      commit('DELETE_TASK', id)
    },
    setTaskDone ({ commit }, id) {
      commit('SET_TASKDONE', id)
    }
  },
  getters: {
    tasksList (state) {
      return state.tasksList
    },
    doneDisplay (state) {
      if (!state.tasksList.length) return ''
      const doneLi = state.tasksList.filter((el) => el.done === true)
      return `${doneLi.length} / ${state.tasksList.length}`
    },
    options (state) {
      return state.options
    }
  }
})
