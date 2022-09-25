<template>
    <main class="list">\
      <template v-if="tasks.length">
        <task v-for="(p,k) in pages" :key="k" :task="tasks[p]" @delete-task="deleteClick" @edit-task="editClick"></task>
      </template>
      <p v-if="tasks.length > 3" class="list__control">
        <button class="list__button" @click="prev">Назад</button>
        <span class="list__counters">{{ currentPage + 1 }} / {{ tasks.length }}</span>
        <button class="list__button" @click="next">Вперед</button>
      </p>
    </main>
</template>
<style lang="scss" scoped>
.list {
    &__button {
        display: block;
        width: 60px;
        color: yellow;
        background-color: transparent;
        padding: 3px 0;
        border: none;
        outline: none;
    }
    &__counters {
        display: block;
        width: 75%;
    }
    &__control {
      position: fixed;
      bottom: 0;
      left: 25%;
      right: 25%;
      z-index: 20;
      display: flex;
      justify-content: space-evenly;
      background-color: darkslateblue;
      width: 45%;
      text-align: center;
      padding: 10px 15px;
      margin: 0 auto;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
}
p {
  color: white;
}
</style>
<script>
import task from '../components/Task.vue'
export default {
  components: {
    task
  },
  data () {
    return {
      currentPage: 0
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.tasksList
    },
    pages () {
      return [this.currentPage, this.currentPage + 1, this.currentPage + 2]
    }
  },
  methods: {
    prev () {
      if (this.currentPage > 2) this.currentPage -= 3
    },
    next () {
      if (this.currentPage < this.$store.getters.tasksList.length - 3) this.currentPage += 3
    },
    editClick (t) {
      this.$router.push('/add?id=' + t.id)
    },
    deleteClick (t) {
      this.$store.dispatch('deleteTask', t.id)
    }
  }
}
</script>