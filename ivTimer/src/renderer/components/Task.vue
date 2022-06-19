<script>
export default {
  props: {
    task: {
      type: [Object, undefined]
    }
  },
  methods: {
    deleteTask () {
      this.$emit('delete-task', this.task)
    },
    editTask () {
      this.$emit('edit-task', this.task)
    }
  }
}
</script>
<template>
    <div v-if="task" class="task">
        <p :class="`task__title task__title-${task.done ? 'done' : 'wait'}`">
            {{ task.title }}
        </p>
        <p class="task__date">
            {{task.day}}.{{task.month}}.{{ task.year }}  {{task.hour}}:{{task.minute}}:{{ task.second }}
        </p>
        <p class="task__body">
            {{ task.body }}
        </p>
        <p class="task__control">
            <span @click="editTask">Изменить</span>
            <span @click="deleteTask">Удалить</span>
        </p>
    </div>
</template>
<style lang="scss" scoped>
.task {
    margin: 15px;
    padding: 0;
    border: 1px solid yellow;
    p {
        margin: 0;
        padding: 5px;
    }
    &__title {
        &-wait {
          color: white;
          background-color: red;
        }
        &-done {
          color: white;
          background-color: green;
        }
        font-weight: 800;
    }
    &__date {
        font-weight: 700;
        color: black;
        background-color: silver;
    }
    &__body {
        color: black;
        background-color: silver;
    }
    &__control {
        color: red;
        font-weight: 700;
        background-color: papayawhip;
    }
}
</style>