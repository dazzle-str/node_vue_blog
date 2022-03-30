<template>
  <el-card class="reset-card">
    <div slot="header" class="clearfix">
      <span>找回密码</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">登录</el-button>
    </div>
    <el-form :model="resetForm" :rules="resetRules" ref="resetRef" @submit.native.prevent="reset">
      <el-form-item prop="email">
        <el-input v-model="resetForm.email" prefix-icon="el-icon-message" clearable placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="resetForm.username" prefix-icon="el-icon-user" clearable placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input v-model="resetForm.newPassword" prefix-icon="el-icon-lock" clearable show-password placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9])+/
      if (regEmail.test(value)) return cb()
      cb(new Error('请输入合法的邮箱'))
    }

    return {
      resetForm: {
        email: '',
        username: '',
        newPassword: ''
      },
      resetRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入合法的用户名', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码的长度在6~12个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toLogin () {
      this.$emit('toLogin')
    },
    async reset () {
      this.$refs.resetRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('api/reset', this.resetForm)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss">
.reset-card {
  width: 480px;
}
</style>
