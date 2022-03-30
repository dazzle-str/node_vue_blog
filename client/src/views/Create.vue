<template>
  <div class="p-16">
    <el-form ref="addRef" :model="addForm" :rules="addRules" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="cate_id">
        <el-select v-model="addForm.cate_id" style="width: 100%">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <vue-editor v-model="addForm.content" />
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload action="#" list-type="picture-card" :limit="1" :auto-upload="false" :file-list="fileList" :on-change="handleChange" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="post('草稿')">保存草稿</el-button>
        <el-button type="primary" @click="post('已发布')">发布文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    aid: {}
  },
  data () {
    return {
      addForm: {
        title: '',
        content: '',
        cate_id: '',
        cover_img: '',
        state: ''
      },
      addRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        cate_id: [{ required: true, message: '请选择文章类型', trigger: 'change' }],
        cover_img: [{ required: true, message: '请上传文章封面', trigger: 'change' }]
      },
      typeList: [],
      fileList: [],
      editForm: {}
    }
  },
  methods: {
    async getCategory () {
      const { data: res } = await this.$http.get('category/list')
      if (res.status !== 0) return this.$message.error(res.message)
      res.data.forEach(item => {
        const type = {}
        type.value = item.cid
        type.label = item.name
        this.typeList.push(type)
      })
    },
    async getArticleDetail (aid) {
      const { data: res } = await this.$http.get(`article/detail/${aid}`)
      if (res.status !== 0) return this.$message.error(res.message)
      const { title, content, cate_id, cover_img } = res.data
      Object.assign(this.addForm, { aid, title, content, cate_id, cover_img })
      const file = { name: cover_img.slice(-17), url: this.$store.state.baseURL + '/uploads/' + cover_img.slice(-17) }
      this.fileList.push(file)
    },
    handleChange (file) {
      this.$set(this.addForm, 'cover_img', file.raw)
    },
    handleRemove () {
      this.$set(this.addForm, 'cover_img', '')
    },
    post (state) {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写必要的表单项')
        this.$set(this.addForm, 'state', state)
        const formData = new FormData()
        for (const key in this.addForm) {
          formData.append(key, this.addForm[key])
        }
        if (this.aid) {
          const { data: res } = await this.$http.put('article/update', formData)
          if (res.status !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push('/myarticle')
        } else {
          const { data: res } = await this.$http.post('article/add', formData)
          if (res.status !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push('/')
        }
      })
    }
  },
  created () {
    this.getCategory()
    if (this.aid) {
      this.getArticleDetail(this.aid)
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style lang="scss" scoped>
.add {
  padding: 20px;
  .el-card {
    margin: 0;
  }
}
</style>
