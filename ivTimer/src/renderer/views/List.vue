<template>
    <main>
        <task v-for="(t,k) in tasks" :key="k" :task="t"></task>
    </main>
</template>
<script>
import task from '../components/Task.vue'
export default {
  components: {
    task
  },
  computed: {
    tasks () {
      return this.$store.getters.tasksList
    }
  }
}
</script>