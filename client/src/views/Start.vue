<template>
  <div class="start">
    <my-login v-if="myComponent === 'login'" @toRegister="myComponent = 'register'" @toReset="myComponent = 'reset'"></my-login>
    <my-register v-if="myComponent === 'register'" @toLogin="myComponent = 'login'"></my-register>
    <my-reset v-if="myComponent === 'reset'" @toLogin="myComponent = 'login'"></my-reset>
  </div>
</template>

<script>
import MyLogin from '../components/Login.vue'
import MyRegister from '../components/Register.vue'
import MyReset from '../components/Reset.vue'

export default {
  data () {
    return {
      myComponent: 'login'
    }
  },
  components: {
    MyLogin,
    MyRegister,
    MyReset
  }
}
</script>

<style lang="scss" scoped>
.start {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
