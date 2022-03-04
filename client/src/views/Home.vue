<template>
  <el-container>
    <el-header>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/create">创作</el-menu-item>
        <el-menu-item index="/console" v-if="role === 'admin'">控制台</el-menu-item>
        <el-submenu index="/mine">
          <template slot="title">我的</template>
          <el-menu-item @click="toInfo">个人中心</el-menu-item>
          <el-menu-item @click="logout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    toInfo () {
      this.$router.push('/userinfo')
    },
    logout () {
      window.localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed: {
    role () {
      return window.localStorage.getItem('role')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header,
  .el-main {
    padding: 0;
  }
}
</style>
