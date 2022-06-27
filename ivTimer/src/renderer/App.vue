<template>
  <div id="app">
    <audio
      id="audio-hour"
      ref="audio-hour"
      :src="'./static/hour.mp3'"
    ></audio>
    <nav class="nav">
        <router-link to="/"  class="nav__link">На главную</router-link>
        <router-link to="/list"  class="nav__link">Список задач</router-link>
        <router-link to="/add"  class="nav__link">Добавить задачу</router-link>
        <router-link to="/info"  class="nav__link">О программе</router-link>
        <span class="nav__link" @click="tray">В трей</span>
        <span class="nav__link" @click="quit">Выход</span>
    </nav>
    <header class="timerbox__header">
      <h1 class="timerbox__header-current" @click="notificationDisplay">
        {{timer.day}} : {{timer.month}} : {{timer.year}}
        {{timer.hour}} : {{timer.minute}} : {{timer.second}}
      </h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  const path = require('path')
  export default {
    name: 'vue-electron-app',
    data () {
      return {
        isTray: false,
        timer: {
          hour: 0,
          minute: 0,
          second: 0,
          day: 0,
          month: 0,
          year: 0
        },
        notification: null,
        intervalId: null,
        strDate: ''
      }
    },
    computed: {
      tasks () {
        return this.$store.getters.tasksList
      }
    },
    methods: {
      quit () {
        ipcRenderer.send('window-close')
      },
      tray () {
        this.isTray = !this.isTray
        ipcRenderer.send('toggle-minToTray', this.isTray)
        // ipcRenderer.send('window-minimize', this.isTray)
      },
      startTimer () {
        this.intervalId = setInterval(() => {
          const [date, time] = (new Date()).toLocaleString().split(',')
          const [day, month, year] = date.split('.')
          const [hour, minute, second] = time.split(':')
          const [$day, $month, $year, $hour, $minute, $second] = [day, month, year, hour, minute, second].map(el => +el)
          const title = document.querySelector('title')
          title.innerText = `ivTimer ${hour}:${minute}:${second} ${day}.${month}.${year}`
          this.timer = {
            day,
            month,
            year,
            hour,
            minute,
            second
          }
          if (this.tasks.length) {
            this.tasks.forEach(el => {
              if ($minute === el.minute && $second === el.second && $hour === el.hour && $day === el.day && $month === el.month && $year === el.year) {
                this.notificationDisplay(el.title, el.body)
                console.log(el.id)
                this.$store.dispatch('setTaskDone', el.id)
              }
            })
          }
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
      this.$store.dispatch('initTask', {
        day: $day,
        month: $month,
        year: $year,
        hour: $hour,
        minute: $minute + 2,
        second: $second,
        title: 'Give a call in two minutes',
        body: 'This is test',
        category: 'test'
      })
      this.startTimer()
    },
    beforeDestroy () {
      console.log('beforeDestroy')
      clearInterval(this.intervalId)
    }
  }
</script>

<style  lang="scss">
  /* CSS */
  body {
    background-color: blueviolet;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  span {
    cursor: pointer;
  }
  #app {
    margin: 0;
    padding: 0;
  }
  .nav {
    margin: 0;
    padding: 5px 0;
    width: 100%;
    background: #f0f0f0;
    &__link {
      color: black;
      text-decoration: none;
      border: none;
      font-size: 14px;
      border: none;
      margin: 0 5px;
    }
  }
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
