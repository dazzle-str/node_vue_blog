<template>
  <div class="console">
    <el-container>
      <el-aside>
        <el-menu :default-active="consoleActivePath" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <el-menu-item index="/console/article" @click="saveMenu('/console/article')">
            <i class="el-icon-menu"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/console/category" @click="saveMenu('/console/category')">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/console/comment" @click="saveMenu('/console/comment')">
            <i class="el-icon-menu"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/console/user" @click="saveMenu('/console/user')">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      consoleActivePath: '/console/article'
    }
  },
  methods: {
    saveMenu (consoleActivePath) {
      window.localStorage.setItem('consoleActivePath', consoleActivePath)
      this.consoleActivePath = consoleActivePath
    }
  },
  created () {
    this.consoleActivePath = window.localStorage.getItem('consoleActivePath')
  }
}
</script>

<style lang="scss" scoped>
.console {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      .el-menu {
        height: 100%;
      }
    }
  }
}
</style>
