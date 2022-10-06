import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalStore } from '../utils/local-store.js'
import { createLocalTimer } from '../utils/local-timer.js'
// import { ipcRenderer } from 'electron'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

const localStore = createLocalStore()
const localTimer = createLocalTimer()

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
      const getList = localStore.get('list')
      if (getList) {
        state.tasksList = getList
      } else {
        state.tasksList = [{ ...localTimer.validateDate(initial) }]
        localStore.set('list', state.tasksList)
      }
      const getOpt = localStore.get('options')
      if (getOpt) {
        state.options = getOpt
      } else {
        localStore.set('list', state.tasksList)
      }
    },
    ADD_TASK (state, task) {
      task.done = false
      state.tasksList.push({ ...localTimer.validateDate(task) })
      localStore.set('list', state.tasksList)
    },
    CHANGE_TASK (state, task) {
      const idFind = state.tasksList.findIndex(el => el.id === task.id)
      state.tasksList[idFind] = { ...localTimer.validateDate(task) }
      localStore.set('list', state.tasksList)
    },
    SET_TASKDONE (state, id) {
      const idFind = state.tasksList.findIndex(el => el.id === id)
      state.tasksList[idFind].done = true
      localStore.set('list', state.tasksList)
    },
    DELETE_TASK (state, id) {
      const idFind = state.tasksList.findIndex(el => el.id === +id)
      state.tasksList.splice(idFind, 1)
      localStore.set('list', state.tasksList)
    },
    SET_OPTIONS (state, options) {
      state.options = options
      localStore.set('list', state.options)
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
    currentDayList (state) {
      return state.tasksList.filter((el) => {
        return localTimer.equlDate({ day: el.day, month: el.month, year: el.year })
      })
    },
    doneDisplay (state) {
      if (!state.tasksList.length) return ''
      const doneLi = state.tasksList.filter((el) => el.done === true)
      const currDay = state.tasksList.filter((el) => {
        return localTimer.equlDate({ day: el.day, month: el.month, year: el.year })
      })
      return `${doneLi.length} / ${currDay.length}`
    },
    options (state) {
      return state.options
    },
    currentMonthList (state) {
      return state.tasksList.filter((el) => {
        return localTimer.equlMonth({ month: el.month, year: el.year })
      })
    },
    currentMonthCount (state) {
      return state.tasksList.filter((el) => {
        return localTimer.equlMonth({ month: el.month, year: el.year })
      }).length
    },
    totalTasksCount (state) { return state.tasksList.length }
  }
})
