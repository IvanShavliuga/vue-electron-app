<template>
<article class="note">
  <h3 class="note__title">#{{note.id+1}} {{note.title}}</h3>
  <ul class="note__menu">
    <li class="note__item"><router-link :to="'/edit/'+note.id">Редактировать</router-link></li>
    <li class="note__item" @click="deletenote(note.id)">Удалить</li>
  </ul>
  <div>
    <TodoItem v-for="(t,k) in note.todos"
      :todo="t"
      :key="k"
      />
  </div>
  <div v-if="note.todos.length===0">
    <p>Нет задач в списке</p>
  </div>
</article>
</template>
<script>
import TodoItem from './TodoItem.vue'
import Modal from '../components/Modal.vue'
export default {
  name: 'Note',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      filter: 'all',
      modalShow: false,
      indDelete: -1
    }
  },
  methods: {
    /* edit(id) {
      this.$store.dispatch("noteSelect", id);
      this.$router.push({ path: "/edit/" })
    }, */
    deletenote (id) {
      this.$emit('delete', id)
    }
  },
  components: {
    TodoItem,
    Modal
  },
  updated () {
    this.$store.dispatch('toStorage', 'undo')
  }
}
</script>
<style>
.note {
  border: 1px solid #c3c3c3;
  width: 40%;
  margin: 10px 15px;
}
.note__menu {
  padding: 0;
  margin: 0 15px;
  text-align: left;
  background-color: #efa0ef;
}
.note__item {
  list-style: none;
  margin: 0 5px;
  display: inline-block;
  cursor: pointer;
}
.note__title {
  font-size: 22px;
  height: 30px;
  margin: 10px 0;
}
@media screen and (max-width: 1100px) {
  .note {
    width: 90%;
  }
}
@media screen and (max-width: 500px) {
  .note {
    width: 100%;
    margin: 0;
  }
}
</style>
