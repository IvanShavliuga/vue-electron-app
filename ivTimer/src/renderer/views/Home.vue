<template>
  <main class="timerbox">
    <calendar/>
    <section class="timerbox__section">
    <p class="timerbox__counters">
      Общее количество задач: <span>{{totalCount}}</span>
    </p>
    <p class="timerbox__counters">
      Количество задач на сегодня: <span>{{currentDayCount}}</span>
    </p>
    <p class="timerbox__counters">
      Количество задач на месяц: <span>{{currentMonth}}</span>
    </p>
    </section>
  </main>
</template>
<script>
import calendar from '../components/Calendar.vue'
export default {
  name: 'Home',
  components: {
    calendar
  },
  computed: {
    totalCount () {
      return this.$store.getters.totalTasksCount
    },
    currentDayCount () {
      return this.$store.getters.currentDayList.length
    },
    currentMonth () {
      return this.$store.getters.currentMonthCount
    }
  }
}
</script>
<style scoped lang="scss">
.timerbox {
  &__section {
    text-align: center;
  } 
  &__counters {
    color: white;
    margin: 7px auto;
    span {
      color: yellow;
    }
  }

}
</style>
