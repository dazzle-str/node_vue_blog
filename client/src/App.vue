<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    if (localStorage.getItem('userdata')) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('userdata')))
    }
  }
}
</script>

<style>
</style>
