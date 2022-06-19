<template>
    <main class="list">
        <task v-for="(p,k) in pages" :key="k" :task="tasks[p]" @delete-task="deleteClick" @edit-task="editClick"></task>
        <p v-if="tasks.length > 3" class="list__control">
          <button class="list__button" @click="prev">Назад</button>
          <span>{{ currentPage + 1 }} / {{ tasks.length }}</span>
          <button class="list__button" @click="next">Вперед</button>
        </p>
    </main>
</template>
<style lang="scss" scoped>
.list {
    &__button {
        color: gray;
        background-color: bisque;
        padding: 5px 15px;
        border: none;
    }
    &__control {
      position: fixed;
      bottom: 0;
      z-index: 20;
      background-color: darkslateblue;
      width: 100%;
      text-align: center;
      padding: 10px 0;
      margin: 0;
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
      console.log(t)
    }
  }
}
</script>