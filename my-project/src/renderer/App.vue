<template>
  <div id="app">
    <div class="linkbox">
      <button class="link">
        <router-link to="/">На главную</router-link>
      </button>
      <button class="link">
        <router-link to="/info">О программе</router-link>
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-electron-app'
  }
</script>

<style>
  /* CSS */
  .link {
    background-color: transparent;
    color: blueviolet;
    font-size: 14px;
    border: none;
    margin: 0 15px;
  }
  .linkbox {
    margin: 15px auto;
    width: 50%;
  }
</style>
