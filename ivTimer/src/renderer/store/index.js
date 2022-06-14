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
    notes: [{
      id: 0,
      title: 'Lorem Ipsum is simply dummy text',
      todos: [{
        id: 0,
        title: 'Lorem Ipsum is simply dummy text',
        done: true
      }, {
        id: 1,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }, {
        id: 2,
        title: 'Lorem Ipsum is simply dummy text',
        done: true
      }, {
        id: 3,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }, {
        id: 4,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }]
    }, {
      id: 1,
      title: 'Lorem Ipsum is simply dummy text',
      todos: [{
        id: 0,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }, {
        id: 1,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }, {
        id: 2,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }, {
        id: 3,
        title: 'Lorem Ipsum is simply dummy text',
        done: true
      }, {
        id: 4,
        title: 'Lorem Ipsum is simply dummy text',
        done: true
      }]
    }, {
      id: 2,
      title: 'Lorem Ipsum is simply dummy text',
      todos: [{
        id: 0,
        title: 'Lorem Ipsum is simply dummy text',
        done: true
      }, {
        id: 1,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }, {
        id: 2,
        title: 'Lorem Ipsum is simply dummy text',
        done: true
      }, {
        id: 3,
        title: 'Lorem Ipsum is simply dummy text',
        done: false
      }, {
        id: 4,
        title: 'Lorem Ipsum is simply dummy text',
        done: true
      }]
    }]
  },
  mutations: {
    INIT_DATA (state) {
      let data = localStorage.getItem('vuetodolist_undo')
      console.log(data)
      console.log(state.notes)
      /* if (data!=null) {
          state.notes = JSON.parse(data);
          console.log(state.notes)
      } */
    },
    SAVE_NOTE (state, note) {
      for (let i = 0; i < state.notes.length; i++) { console.log('save #' + i + ': ' + state.notes[i].todos[0].title) }
      const nt = {
        id: note.id,
        title: note.title,
        todos: note.todos
      }
      const index = state.notes.findIndex(i => i.id === note.id)
      if (index !== -1) {
        state.notes.splice(index, 1, nt)
      } else {
        state.notes.push(nt)
        state.addnote = false
      }
      state.note = {}
    },
    DELETE_NOTE (state, id) {
      localStorage.setItem('vuetodolist_undo', JSON.stringify(state.notes))
      const index = state.notes.findIndex(i => i.id === id)
      if (index !== -1) {
        state.notes.splice(index, 1)
      }
    },
    UNDO_NOTE (state) {
      const nt = state.notes
      let data = localStorage.getItem('vuetodolist_undo')
      if (data) {
        state.notes = JSON.parse(data)
        localStorage.setItem('vuetodolist_redo', JSON.stringify(nt))
      }
    },
    REDO_NOTE (state) {
      const nt = state.notes
      let data = localStorage.getItem('vuetodolist_redo')
      if (data) {
        state.notes = JSON.parse(data)
        localStorage.setItem('vuetodolist_undo', JSON.stringify(nt))
      }
    },
    TO_STORAGE (state, type) {
      if (type === 'undo') { localStorage.setItem('vuetodolist_undo', JSON.stringify(state.notes)) }
      if (type === 'redo') { localStorage.setItem('vuetodolist_redo', JSON.stringify(state.notes)) }
    }
  },
  actions: {
    initData ({commit}) {
      try {
        commit('INIT_DATA')
      } catch (e) {
        console.log(e)
      }
    },
    toStorage ({commit}, type) {
      try {
        commit('TO_STORAGE', type)
      } catch (e) {
        console.log(e)
      }
    },
    deleteNote ({commit}, index) {
      try {
        commit('DELETE_NOTE', index)
      } catch (e) {
        console.log(e)
      }
    },
    undoNote ({commit}) {
      try {
        commit('UNDO_NOTE')
      } catch (e) {
        console.log(e)
      }
    },
    redoNote ({commit}) {
      try {
        commit('REDO_NOTE')
      } catch (e) {
        console.log(e)
      }
    },
    saveNote ({commit}, note) {
      try {
        commit('SAVE_NOTE', note)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    allNotes (state) {
      return state.notes
    }
  }
})
