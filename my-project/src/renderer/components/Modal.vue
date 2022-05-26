<template>
<div class="modal">
  <div class="modal__box">
    <p class="modal__text">Вы не сохранили изменения. Все равно продолжить</p>
    <i class="modal__close" role="button" @click="submit('no')">X</i>
    <button class="modal__button modal__yes" @click="submit('yes')">Yes</button>
    <button class="modal__button modal__no" @click="submit('no')">No</button>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    submit (type) {
      this.$emit('answer', type)
    }
  }
}
</script>
<style>
/*body {
  overflow: hidden;
}*/
.modal {
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100%;
  position: absolute;
}
.modal__box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 30%;
  border: 2px solid #ddd;
  background-color: #fff;
  color: #342525;
}
.modal__text {
  font-size: 22px;
}
.modal__button {
  padding: 10px;
  font-size: 24px;
  height: 50px;
  color: #fff;
  margin: 20px;
  cursor: pointer;
}
.modal__yes {
  background-color: #45ac45;
  border: 1px solid #238923;
}
.modal__no {
  background-color: #ac4545;
  border: 1px solid #892323;
}
.modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  color:#232323;
  width: 20px;
  height: 20px;
  font-size: 18px;
  font-style: normal;
  cursor: pointer;
}
</style>
