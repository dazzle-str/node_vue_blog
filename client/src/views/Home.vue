<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activePath" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/" @click="saveMenu('/')">首页</el-menu-item>
        <el-menu-item index="/console" @click="saveMenu('/console')">控制台</el-menu-item>
        <el-submenu index="/mine">
          <template slot="title">我的</template>
          <el-menu-item @click="logout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      activePath: '/'
    }
  },
  methods: {
    logout () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    },
    saveMenu (activePath) {
      window.localStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created () {
    this.activePath = window.localStorage.getItem('activePath')
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    padding: 0;
  }
}
</style>
