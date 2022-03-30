<template>
  <div class="recommend">
    <el-card>
      <el-form label-position="top">
        <el-form-item label="推荐位1">
          <el-select v-model="recForm.rec1" style="width: 100%" @change="setRec(1, recForm.rec1)">
            <el-option v-for="item in articles" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐位2">
          <el-select v-model="recForm.rec2" style="width: 100%" @change="setRec(2, recForm.rec2)">
            <el-option v-for="item in articles" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐位3">
          <el-select v-model="recForm.rec3" style="width: 100%" @change="setRec(3, recForm.rec3)">
            <el-option v-for="item in articles" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐位4">
          <el-select v-model="recForm.rec4" style="width: 100%" @change="setRec(4, recForm.rec4)">
            <el-option v-for="item in articles" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐位5">
          <el-select v-model="recForm.rec5" style="width: 100%" @change="setRec(5, recForm.rec5)">
            <el-option v-for="item in articles" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 30,
        state: '已发布'
      },
      articles: [],
      recForm: {
        rec1: '',
        rec2: '',
        rec3: '',
        rec4: '',
        rec5: ''
      }
    }
  },
  methods: {
    async getArticleList () {
      const { data: res } = await this.$http.get('article/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      const articles = []
      res.data[0].forEach(item => {
        const option = { value: item.aid, label: item.title }
        articles.push(option)
      })
      this.articles = articles
    },
    async getRec () {
      const { data: res } = await this.$http.get('recommend/get')
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      res.data.forEach(item => {
        this.$set(this.recForm, `rec${item.rid}`, item.article_id)
      })
    },
    async setRec (rid, article_id) {
      const { data: res } = await this.$http.put('recommend/set', { rid, article_id })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
    }
  },
  created () {
    this.getArticleList()
    this.getRec()
  }
}
</script>

<style>

</style>
