<template>
   <main class="options">
        <p class="options__control">
          <input id="hour" type="checkbox" value="hour" v-model="options.hour" name="hour"/>
          <label for="hour" class="options__label">Сигналить каждый час</label>
        </p>
        <p class="options__control">
          <input id="test" type="checkbox" value="test" v-model="options.test" name="test"/>
          <label for="test" class="options__label">Выдавать тестовое уведомление при нажатии на текущее время</label>
        </p>
        <!-- <p class="options__control">
          <input id="alwaysOnTop" type="checkbox" value="alwaysOnTop" v-model="options.alwaysOnTop" name="alwaysOnTop"/>
          <label for="alwaysOnTop" class="options__label">Поверх всех окон</label>
        </p> -->
        <p class="options__control">
          <button class="options__button">Отмена</button>
          <button @click="optClick" class="options__button">Сохранить</button>
        </p>
    </main>
</template>
<style lang="scss" scoped>
.options {
    &__control {
        text-align: left;
        width: 70%;
        margin: 15px auto;
    }
    &__button {
        color: gray;
        background-color: bisque;
        padding: 5px 15px;
        border: none;
    }
}
p {
  color: white;
}
</style>
<script>
export default {
  data () {
    return {
      options: {
        // alwaysOnTop: false,
        hour: true,
        test: true
      }
    }
  },
  methods: {
    optClick () {
      this.$store.dispatch('setOptions', this.options)
    }
  },
  mounted () {
    this.options = { ...this.$store.getters.options }
  }
}
</script>