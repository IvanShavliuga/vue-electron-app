<template>
  <div id="app">
    <nav class="nav">
        <router-link to="/"  class="nav__link">На главную</router-link>
        <router-link to="/info"  class="nav__link">О программе</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-electron-app'
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
</style>
