<template>
  <div class="info">
    <div class="container form">
      <el-form :inline="true" :model="userinfo">
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="userinfo">
        <el-form-item label="昵称">
          <el-input v-model="userinfo.username" :disabled="!editusername"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" v-if="!editusername" @click="editusername = true">修改昵称</el-button>
          <el-button type="primary" size="mini" v-else @click="saveUsername">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {},
      editusername: false
    }
  },
  methods: {
    async getInfo () {
      const { data: res } = await this.$http.get('user/detail')
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.userinfo = res.data
    },
    async saveUsername () {
      const { data: res } = await this.$http.put('user/update/username', { username: this.userinfo.username })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.editusername = false
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 100px 0;
}
</style>
