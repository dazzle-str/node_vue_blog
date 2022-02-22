<template>
  <div class="article">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select v-model="queryInfo.cate_id" clearable placeholder="分类" @clear="clearCate">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryInfo.state" clearable placeholder="状态" @clear="clearState">
            <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="getArticleList">搜索</el-button>
        </el-col>
      </el-row>

      <el-table :data="articleList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="作者" prop="author_name"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="发布时间" prop="pub_date"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeArticle(scope.row.aid)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background> </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      categoryList: [],
      stateList: [
        { value: '已发布', label: '已发布' },
        { value: '草稿', label: '草稿' }
      ],
      articleList: [],
      total: 0
    }
  },
  methods: {
    async getCategoryList () {
      const { data: res } = await this.$http.get('category/list')
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      res.data.forEach(item => {
        const cate = { value: item.cid, label: item.name }
        this.categoryList.push(cate)
      })
    },
    clearCate () {
      this.$delete(this.queryInfo, 'cate_id')
    },
    clearState () {
      this.$delete(this.queryInfo, 'state')
    },
    async getArticleList () {
      const { data: res } = await this.$http.get('article/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.articleList = res.data[0]
      this.total = res.data[1][0].total
    },
    async removeArticle (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('取消删除')
      const { data: res } = await this.$http.delete(`article/delete/${id}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getArticleList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getArticleList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getArticleList()
    }
  },
  created () {
    this.getCategoryList()
    this.getArticleList()
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 0;
  .el-table,
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
