<template>
  <main>
      <system-information></system-information>
  </main>
</template>

<script>
  import SystemInformation from '../components/LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
}
</style>