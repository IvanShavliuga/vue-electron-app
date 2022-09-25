<template>
  <div id="app">
    <audio
      id="audio-hour"
      ref="audio-hour"
      :src="'./static/hour.mp3'"
    ></audio>
    <div class="title">
      <button class="title__button"  @click="about">?</button>
      <p class="title__text">IvTimer <span class="title__counters">{{ doneDisplay }}</span></p>
      <p class="title__block">
        <button class="title__button" @click="tray">_</button>
        <button class="title__button" @click="quit">X</button>
      </p>
    </div>
    <nav class="nav">
        <router-link to="/"  class="nav__link">На главную</router-link>
        <router-link to="/list"  class="nav__link">Список задач</router-link>
        <router-link to="/add"  class="nav__link">Добавить задачу</router-link>
        <router-link to="/options"  class="nav__link">Настройки</router-link>
    </nav>
    <header class="timerbox__header">
      <h1 class="timerbox__header-current" @click="notificationTest">
        {{timer.day}}.{{timer.month}}.{{timer.year}}
        {{timer.hour}}:{{timer.minute}}:{{timer.second}}
      </h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  const path = require('path')
  export default {
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
      },
      doneDisplay () {
        return this.$store.getters.doneDisplay
      }
    },
    methods: {
      about () {
        this.$router.push('/info')
      },
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
          const options = { ...this.$store.getters.options }
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
          if (!$minute && !$second && options.hour) {
            this.notificationDisplay(`New hour ${$hour}`, `This time ${hour}:${minute}:${second}`)
          }
        }, 1000)
      },
      notificationTest () {
        const test = this.$store.getters.options.test
        if (test) {
          this.notificationDisplay('Test application', 'This is text for test')
        }
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
  .title {
    display: flex;
    justify-content: space-between;
    font-family: 'Courier New', Courier, monospace;
    background-color: indigo;
    padding: 5px 0;
    margin: 0;
    width: 100%;
    &__counters {
      letter-spacing: -1px;
    }
    &__text {
      color: tan;
      width: calc(100% - 32px * 3 - 30px);
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
      -webkit-app-region: drag;
    }
    &__button {
      font-family: inherit;
      color: tan;
      background-color: transparent;
      border: none;
      width: 32px;
      margin: 0 1px;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
      outline: none;
    }
    &__block {
      margin: 0;
    }
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
      border-bottom: 1px solid tan;
      margin: 0;
      cursor: pointer;
      &-current {
        padding: 0;
        margin: 0;
        background: rgba(20,20,120,0.7);
        color: tan;
      }
    }
  }
</style>
