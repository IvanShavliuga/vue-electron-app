<template>
  <main class="timerbox">
    <calendar/>
    <!-- <p style="color: yellow">{{ tasks.length }}</p> -->
  </main>
</template>
<script>
import calendar from '../components/Calendar.vue'
export default {
  name: 'Home',
  components: {
    calendar
  }
}
</script>
<style scoped lang="scss">
</style>
