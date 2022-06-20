<template>
    <main class="add">
        <h1 class="add__header">Добавление задачи #{{ $route.query.id || editData.id }}</h1>
        <div class="add__box">
            <div class="add__box-control">
                <p class="add__label">Заголовок</p>
                <input class="add__input add__input-text" type="text" v-model="editData.title"/>
            </div>
            <div class="add__box-control">
                <p class="add__label">Текст</p>
                <input class="add__input add__input-text" type="text" v-model="editData.body"/>
            </div>
            <div class="add__box-control">
                <p class="add__label"><span>Время</span> <button class="add__button add__button-float" @click="setCurrent">Доп.</button></p>
                <input class="add__input add__input-number" type="number" min="1" max="23" v-model="editData.hour"/>
                <input class="add__input add__input-number" type="number" min="1" max="59" v-model="editData.minute"/>
                <input class="add__input add__input-number" type="number" min="1" max="59" v-model="editData.second"/>
            </div>
            <div class="add__box-control">
                <p class="add__label"><span>Дата</span> <button class="add__button add__button-float" @click="setCurrent">Доп.</button></p>
                <input class="add__input add__input-number" type="number" min="1" max="31" v-model="editData.day"/>
                <input class="add__input add__input-number" type="number" min="1" max="12" v-model="editData.month"/>
                <input class="add__input add__input-number" type="number" v-model="editData.year"/>
            </div>            
            <div class="add__box-control">
                <button class="add__button" @click="addTask">{{ $route.query.id ? 'Изменить' : 'Добавить' }}</button>
                <button class="add__button" @click="setCurrent">Тек. время</button>
            </div>
        </div>
        <p v-if="successText" class="add__success">{{ successText }}</p>
        <p v-if="errorText" class="add__error">{{ errorText }}</p>
    </main>
</template>
<style lang="scss" scoped>
.add {
    &__success {
        position: fixed;
        bottom: 0;
        z-index: 20;
        width: 100%;
        margin: 0;
        padding: 5px;
        color: white;
        background-color: green;
    }
    &__error {
        position: fixed;
        bottom: 0;
        z-index: 20;
        width: 100%;
        margin: 0;
        padding: 5px;
        color: yellow;
        background-color: red;
    }    
    &__header {
        color: yellow;
        font-size: 20px;
        text-align: center;
    }
    &__button {
        color: gray;
        background-color: bisque;
        padding: 5px 15px;
        border: none;
    }
    &__label {
        margin: 0;
        color: yellow;
        text-align: justify;
        span {
            display: inline-block;
            width: 200px;
        }
    }
    &__box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &-control {
            padding: 5px;
            margin: 5px 0;
        }
    }
    &__input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid white;
        outline: none;
        color: white;
        margin: 5px;
        padding: 5px;
        &:focus {
            background-color: rgba(darkslateblue, 0.3);
        }
        &-number {
            width: 60px;
            display: inline;
        }
        &-text {
            width: 230px;
            display: block;
        }
    }
}
</style>
<script>
export default {
  data () {
    return {
      errorText: '',
      successText: '',
      editData: {
        title: '',
        body: '',
        hour: 1,
        minute: 1,
        second: 1,
        day: 1,
        month: 1,
        year: 2022
      }
    }
  },
  methods: {
    addTask () {
      if (this.editData.title.length < 40 && this.editData.body.length < 40 && this.editData.title.length > 5 && this.editData.body.length > 5) {
        if ('id' in this.$route.query) {
          this.$store.dispatch('changeTask', { ...this.editData })
        } else {
          this.$store.dispatch('addTask', { ...this.editData })
        }
        this.errorText = ''
        this.successText = 'Задача успешно добавлена'
      } else {
        this.errorText = 'Слишком длинные или короткие тексты для задачи'
        this.successText = ''
      }
    },
    setCurrent () {
      const [date, time] = (new Date()).toLocaleString().split(',')
      const [day, month, year] = date.split('.')
      const [hour, minute, second] = time.split(':')
      this.editData.day = +day
      this.editData.month = +month
      this.editData.year = +year
      this.editData.hour = +hour
      this.editData.minute = +minute
      this.editData.second = +second
    }
  },
  mounted () {
    const arr = [ ...this.$store.getters.tasksList ]
    this.setCurrent()
    if ('id' in this.$route.query) {
      const fres = arr.filter(el => el.id === +this.$route.query.id)[0]
      if (fres) this.editData = { ...fres }
      console.log(fres)
    }
  }
}
</script>
