<template>
    <main class="add">
        <h1 class="add__header">Добавление задачи</h1>
        <div class="add__box">
            <div class="add__box-control">
                <p class="add__label">Заголовок / текст</p>
                <input class="add__input add__input-text" type="text" v-model="editData.title"/>
                <input class="add__input add__input-text" type="text" v-model="editData.body"/>
            </div>
            <div class="add__box-control">
                <p class="add__label">Время</p>
                <input class="add__input add__input-number" type="number" min="1" max="23" v-model="editData.hour"/>
                <input class="add__input add__input-number" type="number" min="1" max="59" v-model="editData.minute"/>
                <input class="add__input add__input-number" type="number" min="1" max="59" v-model="editData.second"/>
            </div>
            <div class="add__box-control">
                <p class="add__label">Дата</p>
                <input class="add__input add__input-number" type="number" min="1" max="31" v-model="editData.day"/>
                <input class="add__input add__input-number" type="number" min="1" max="12" v-model="editData.month"/>
                <input class="add__input add__input-number" type="number" v-model="editData.year"/>
            </div>
            <div class="add__box-control">
                <button class="add__button" @click="addTask">Добавить</button>
            </div>
        </div>
    </main>
</template>
<style lang="scss" scoped>
.add {    
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
        color: white;
        margin: 5px;
        padding: 5px;
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
      if (this.editData.title && this.editData.body) {
        this.$store.dispatch('addTask', { ...this.editData })
      }
    }
  },
  mounted () {
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
}
</script>
