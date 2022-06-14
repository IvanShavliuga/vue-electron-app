<template>
  <div class="box">
    <div class="title">Information</div>
    <div class="items">
      <div class="item">
        <div class="name">App name:</div>
        <div class="value">{{ name }}</div>
      </div>
      <div class="item">
        <div class="name">App version:</div>
        <div class="value">{{ appVersion }}</div>
      </div>
      <div class="item">
        <div class="name">App author:</div>
        <div class="value">{{ author }}</div>
      </div>
      <div class="item">
        <div class="name">Email:</div>
        <div class="value">{{ email }}</div>
      </div>
      <div class="item">
        <div class="name">Vue.js:</div>
        <div class="value">{{ vue }}</div>
      </div>
      <div class="item">
        <div class="name">Electron:</div>
        <div class="value">{{ electron }}</div>
      </div>
      <div class="item">
        <div class="name">Node:</div>
        <div class="value">{{ node }}</div>
      </div>
      <div class="item">
        <div class="name">Platform:</div>
        <div class="value">{{ platform }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as pckg from './../../../../package.json'
export default {
  data () {
    return {
      electron: process.versions.electron,
      node: process.versions.node,
      path: this.$route.path,
      platform: require('os').platform(),
      vue: require('vue/package.json').version,
      appVersion: pckg.version,
      author: pckg.author,
      email: pckg.email,
      name: pckg.name
    }
  }
}
</script>

<style scoped>
  .box {
    width: 70%;
    height: 70%;
    padding: 15px;
    background-color: rgba(250, 10, 250, 0.3);
    box-shadow: 0 0 15px 15px rgba(250, 250, 250, 0.3);
  }
  .title {
    color: white;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: white;
    margin-right: 6px;
  }

  .item .value {
    color: yellow;
    font-weight: bold;
  }
</style>
