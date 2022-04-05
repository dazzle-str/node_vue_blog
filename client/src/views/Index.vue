<template>
  <div>
    <div class="fixed w-full h-12 md:h-20 bg-black md:bg-gray-50 z-50">
      <div class="flex justify-between items-center md:hidden h-full ">
        <input type="checkbox" id="toggler" class="hidden">
        <label for="toggler">
          <div class="w-4 h-4 relative left-4">
            <span class="block h-0.5 relative top-0 transition-all bg-white"></span>
            <span class="block h-0.5 relative top-0 transition-all bg-white mt-3"></span>
          </div>
        </label>
        <div class="nav w-full h-screen absolute top-12 left-0 bg-black">
          <ul class="text-gray-300 mx-10 my-4">
            <li class="py-4 border-b border-gray-500" @click="unchecked">
              <router-link to="/userinfo">个人中心</router-link>
            </li>
            <li class="py-4 border-b border-gray-500" @click="unchecked">
              <router-link to="/myarticle">内容管理</router-link>
            </li>
          </ul>
        </div>

        <h1 class="text-xl font-bold text-white" @click="unchecked">
          <router-link to="/">BetterCoder</router-link>
        </h1>

        <div class="w-4 h-4 relative right-4 leading-none">
          <template v-if="token">
            <el-popconfirm title="你确定要退出登录吗？" @confirm="logout">
              <i class="el-icon-circle-close text-white" slot="reference"></i>
            </el-popconfirm>
          </template>
          <i class="el-icon-circle-plus-outline text-white" @click="login" v-else></i>
        </div>
        <!-- <div class="w-12 h-12 bg-gray-500"></div> -->
      </div>
      <div class="hidden md:flex justify-between items-center px-14 py-6 font-bold max-w-screen-xl mx-auto">
        <h1 class="text-2xl">
          <router-link to="/">BetterCoder</router-link>
        </h1>
        <router-link to="/create">
          <i class="el-icon-edit text-xl"></i>
        </router-link>
        <div class="text-xl w-1/3 flex justify-between items-center">
          <router-link to="/userinfo">个人中心</router-link>
          <router-link to="/myarticle">内容管理</router-link>
          <router-link to="/console" target="_blank" v-if="role">
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

    <div class="bg-gray-200 pt-12 md:pt-20">
      <div class="max-w-screen-xl mx-auto bg-white">
        <router-view></router-view>

        <div class="px-4 md:px-20 py-2 md:py-6 border-t">
          <span class="font-bold">BetterCoder</span>
          2022 copyright
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
      localStorage.clear()
      this.$router.go(0)
    },
    unchecked () {
      document.getElementById('toggler').checked = false
    }
  },
  computed: {
    role () {
      const { user = {} } = this.$store.state
      if (user.role && user.role === 'admin') {
        return true
      } else {
        return false
      }
    },
    token () {
      const { user = {} } = this.$store.state
      if (user.token) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
#toggler:checked + label div span:first-child {
  transform: rotate(45deg);
  top: 7px;
}

#toggler:checked + label div span:last-child {
  transform: rotate(-45deg);
  top: -7px;
}

.nav {
  transform: scaleY(0);
  transform-origin: 50% 0;
  transition: all .5s ease-in-out;
}

#toggler:checked ~ .nav {
  transform: scaleY(1);
}
</style>
