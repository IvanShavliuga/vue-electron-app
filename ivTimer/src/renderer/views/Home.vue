<template>
  <main class="timerbox">
    <header class="timerbox__header">
      <h1 class="timerbox__header-current">
        {{timer.day}} : {{timer.month}} : {{timer.year}}
        {{timer.hour}} : {{timer.minute}} : {{timer.second}}
      </h1>
    </header>
    <calendar/>
  </main>
</template>
<script>
import calendar from '../components/Calendar.vue'
export default {
  name: 'Home',
  components: {
    calendar
  },
  data () {
    return {
      timer: {
        hour: 0,
        minute: 0,
        second: 0,
        day: 0,
        month: 0,
        year: 0
      },
      strDate: ''
    }
  },
  methods: {
    startTimer () {
      setInterval(() => {
        const [date, time] = (new Date()).toLocaleString().split(',')
        const [day, month, year] = date.split('.')
        const [hour, minute, second] = time.split(':')
        this.timer = {
          day,
          month,
          year,
          hour,
          minute,
          second
        }
      }, 1000)
    }
  },
  mounted () {
    this.startTimer()
  }
}
</script>
<style scoped lang="scss">
.timerbox {
  padding: 0;
  margin: 0;
  &__header {
    text-align: center;
    border-bottom: 1px solid yellow;
    margin: 0;
    &-current {
      padding: 0;
      margin: 0;
      background: rgba(20,20,200,0.5);
      color: yellow;
    }
  }
}
</style>
