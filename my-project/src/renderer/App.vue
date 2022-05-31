<template>
  <div id="app">
    <div class="linkbox">
        <router-link to="/"  class="link">На главную</router-link>
        <router-link to="/info"  class="link">О программе</router-link>
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
  body {
    background-color: blueviolet;
  }
  .link {
    color: white;
    background-color: blueviolet;
    border: none;
    font-size: 14px;
    border: none;
    margin: 0 5px;
  }
  .linkbox {
    margin: 15px auto;
    width: 70%;
  }
</style>
