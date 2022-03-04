<template>
  <div class="register">
    <el-card class="register-card">
      <div slot="header" class="clearfix">
        <span>注册</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">登录</el-button>
      </div>
      <el-form :model="registerForm" :rules="registerRules" ref="registerRef" @submit.native.prevent="register">
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" prefix-icon="el-icon-message" clearable placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user" clearable placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" clearable show-password placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
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
      registerForm: {
        email: '',
        username: '',
        password: ''
      },
      registerRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '用户名的长度在1~10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码的长度在6~12个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    async register () {
      this.$refs.registerRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('api/register', this.registerForm)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  .register-card {
    width: 480px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
