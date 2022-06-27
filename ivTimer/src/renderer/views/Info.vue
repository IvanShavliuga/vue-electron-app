<template>
  <main>
      <system-information></system-information>
  </main>
</template>

<script>
  import SystemInformation from '../components/SystemInformation'

  export default {
    name: 'info-page',
    components: { SystemInformation }
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