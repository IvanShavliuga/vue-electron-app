<template>
  <div class="home">
    <div class="edit__form" v-if="!modalShow">
      <h1 class="home__title">Список заметок</h1>
      <div class = "form__panel">
        <button class="form__button button__cancel"
          title="Отменить изменения"
          @click="undoNote">
          Отмена
        </button>
        <button class="form__button button__retry"
          title="Повторить изменения"
          @click="redoNote">
          Повторить
        </button>
        <button class="form__button botton__add"
          title="добавить заметку"
          >
          <router-link to="/edit/add">Добавить</router-link>
        </button>
      </div>
      <div class="home__list" v-if="allNotes.length">
        <Note v-for="(n, k) in allNotes"
          :key="k"
          :note="n"
          @delete="delnote"/>
      </div>
      <div v-else>
        Здесь нет заметок
      </div>
    </div>
    <div v-else>
      <Modal @answer="send"/>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Note from '../components/Note.vue'
import Modal from '../components/Modal.vue'
export default {
  name: 'Home',
  components: {
    Note,
    Modal
  },
  data () {
    return {
      modalShow: false,
      idDelete: -1
    }
  },
  computed: {
    ...mapGetters(['allNotes'])
  },
  methods: {
    ...mapActions(['undoNote', 'redoNote']),
    delnote (id) {
      this.modalShow = true
      this.idDelete = id
    },
    send (type) {
      if (type === 'yes') {
        this.$store.dispatch('deleteNote', this.idDelete)
      }
      this.modalShow = false
    }
  }
}
</script>
<style>
.home {
  margin: 0 auto;
  padding: 0;
  width: 80%;

}
.home__title {
  margin: 10px;
  padding: 0;
  font-size: 32px;
  text-align: left;
  color: #765681;
}
.home__list {
  display: flex;
  flex-wrap: wrap;
}
.nav {
  padding: 30px;
}
.form__link {
  color: #fff;
  font-size: 22px;
  text-decoration: none;
}
.form__button a {
  color: #fff;
  text-decoration: none;
}
.nav__item {
  list-style: none;
  display: inline-block;
  margin: 0 25px;
  font-weight: bold;
  color: #2c3e50;
  font-size: 22px;
}
@media screen and (max-width: 500px) {
  .nav {
    padding: 5px;
    width: 100%;
  }
  .nav__item {
    margin: 0 5px;
    font-size: 18px;
  }
  .nav a {
    font-size: 18px;
  }
  .home {
    width: 100%;
    margin: 0;
  }
  .home__list {
    width: 100%;
    margin: 0;
  }
}
</style>
