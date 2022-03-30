<template>
  <div>
    <div class="fixed w-full h-20 bg-gray-50 z-50">
      <div class="px-14 py-6 flex justify-between items-center font-bold max-w-screen-xl mx-auto">
        <h1 class="text-2xl">
          <router-link to="/">BetterCoder</router-link>
        </h1>
        <router-link to="/create">
          <i class="el-icon-edit text-xl"></i>
        </router-link>
        <div class="text-xl w-1/3 flex justify-between items-center">
          <router-link to="/userinfo">个人中心</router-link>
          <router-link to="/myarticle">内容管理</router-link>
          <router-link to="/console" target="_blank" v-if="role === 'admin'">
            <i class="el-icon-s-platform"></i>
          </router-link>
          <template v-if="token">
            <el-popconfirm title="你确定要退出登录吗？" @confirm="logout">
              <i class="el-icon-error" slot="reference"></i>
            </el-popconfirm>
          </template>
          <el-button type="info" size="mini" @click="login" v-else>登录</el-button>
        </div>
      </div>
    </div>

    <div class="bg-gray-200 pt-20">
      <div class="max-w-screen-xl mx-auto bg-white">
        <router-view></router-view>

        <div class="px-20 py-6 border-t">
          <span class="font-bold">BetterCoder</span>
          2022 copyright all rights reserved
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push('/start')
    },
    logout () {
      window.localStorage.clear()
      this.$router.go(0)
    }
  },
  computed: {
    role () {
      return window.localStorage.getItem('role')
    },
    token () {
      return window.localStorage.getItem('token')
    }
  }
}
</script>

<style>

</style>
