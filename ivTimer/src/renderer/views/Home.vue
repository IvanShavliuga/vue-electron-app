<template>
  <main class="timerbox">
    <header class="timerbox__header">
      <h1 class="timerbox__header-current" @click="notificationDisplay">
        {{timer.day}} : {{timer.month}} : {{timer.year}}
        {{timer.hour}} : {{timer.minute}} : {{timer.second}}
      </h1>
    </header>
    <calendar/>
    <task v-for="(t,k) in tasks" :key="k" :task="t"></task>
    <audio
      id="audio-hour"
      ref="audio-hour"
      :src="'./static/hour.mp3'"
    ></audio>
  </main>
</template>
<script>
import calendar from '../components/Calendar.vue'
import task from '../components/Task.vue'
const path = require('path')
export default {
  name: 'Home',
  components: {
    calendar,
    task
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
      notification: null,
      strDate: '',
      tasks: [{
        day: 0,
        month: 0,
        year: 0,
        hour: 0,
        minute: 0,
        second: 0
      }]
    }
  },
  methods: {
    startTimer () {
      setInterval(() => {
        const [date, time] = (new Date()).toLocaleString().split(',')
        const [day, month, year] = date.split('.')
        const [hour, minute, second] = time.split(':')
        const [$day, $month, $year, $hour, $minute, $second] = [day, month, year, hour, minute, second].map(el => +el)
        this.timer = {
          day,
          month,
          year,
          hour,
          minute,
          second
        }
        this.tasks.forEach(el => {
          if ($minute === el.minute && $second === el.second && $hour === el.hour && $day === el.day && $month === el.month && $year === el.year) {
            this.notificationDisplay(el.title, el.body)
          }
        })
        if (!$minute && !$second) {
          this.notificationDisplay(`New hour ${$hour}`, `This time ${hour}:${minute}:${second}`)
        }
      }, 1000)
    },
    notificationDisplay (title, body = 'This is text for test') {
      if (typeof title === 'object') {
        title = 'Test'
      }
      this.notification = new Notification(title, {
        body,
        icon: path.join('static', 'icon.png'),
        silent: true
      })
      this.$refs['audio-hour'].play()
    }
  },
  mounted () {
    const [date, time] = (new Date()).toLocaleString().split(',')
    const [day, month, year] = date.split('.')
    const [hour, minute, second] = time.split(':')
    const [$day, $month, $year, $hour, $minute, $second] = [day, month, year, hour, minute, second].map(el => +el)
    this.tasks[0] = {
      day: $day,
      month: $month,
      year: $year,
      hour: $hour,
      minute: $minute + 2,
      second: $second,
      title: 'Give a call in two minutes',
      body: 'This is test'
    }
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
    cursor: pointer;
    &-current {
      padding: 0;
      margin: 0;
      background: rgba(20,20,200,0.5);
      color: yellow;
    }
  }
}
</style>
