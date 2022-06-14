<template>
  <div class="todo">
    <p class="todo__info">
      <span class="todo__id">#{{todo.id + 1}}</span>
      <span class="todo__title" v-if="mode=='read'">{{todo.title}}</span>
      <span class="todo__title" v-if="mode=='write'&&!changeflag">{{todoedit.title}}</span>
      <input class="todo__input"
        type="text"
        v-if="mode=='write'&&changeflag"
        v-model="todoedit.title"
      />
    </p>
    <p class="todo__status">
      <input type="checkbox"
        v-model="todoedit.done"
        v-if="mode=='write'&&changeflag"
      />
      <span v-if="mode=='read'" :class="(todo.done)?('todo__done'):('')">
        {{(todo.done)?('выполнено'):('в очереди')}}
      </span>
      <span v-if="mode=='write'" :class="(todoedit.done)?('todo__done'):('')">
        {{(todoedit.done)?('выполнено'):('в очереди')}}
      </span>
      <button class="todo__button todo__delete"
        v-if="mode=='write'"
        @click="deleteTodo(todo.id)">
        Удалить
      </button>
      <button class="todo__button todo__delete"
        v-if="mode=='write'"
        @click="changeTodo">
        Изменить
      </button>
    </p>
  </div>
</template>
<script>
// import {mapActions} from 'vuex'
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'read'
    }
  },
  data () {
    return {
      todoedit: {},
      changeflag: false
    }
  },
  methods: {
    deleteTodo (id) {
      this.$emit('delete', id)
    },
    changeTodo () {
      if (!this.changeflag) {
        this.changeflag = true
      } else {
        this.$emit('changetodo', this.todoedit)
        this.changeflag = false
      }
    }
  },
  created () {
    if (this.mode === 'write') {
      this.todoedit = {
        id: this.todo.id,
        title: this.todo.title,
        done: this.todo.done
      }
    }
  }
}
</script>
<style scoped>
.todo {
  border: 1px dotted #df98a0;
  font-size: 22px;
  padding: 0;
  margin: 15px;
  color: #342734;
}
.todo__id {
  padding-right: 10px;
}
.todo__body {
  background-color: #f0f0f0;
  padding: 15px 5px;
  margin: 0;
  text-align: justify;
}
.todo__info, .todo__status{
  padding: 5px  0;
  margin: 0;
  font-size: 18px;
  background-color: #d6f6f9;
  text-align: left;
}
.todo__status {
  display: flex;
  flex-wrap: wrap;
}
.todo__done {
  color: #389e27;
}
.todo__title {
  color: #672356;
}
.todo__input {
  height: 30px;
  font-size: 20px;
}
.todo__button {
  color: #2539a8;
  text-transform: uppercase;
  text-decoration: underline;
  margin: 0;
  padding: 0 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
