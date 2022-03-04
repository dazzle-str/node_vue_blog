<template>
  <div class="comment">
    <el-card>
      <el-input v-model="input" clearable>
        <el-select v-model="select" slot="prepend" clearable>
          <el-option label="用户" value="username"></el-option>
          <el-option label="文章" value="title"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getCommentList"></el-button>
      </el-input>

      <el-table :data="commentList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="评论" prop="content"></el-table-column>
        <el-table-column label="用户" prop="username"></el-table-column>
        <el-table-column label="文章" prop="title"></el-table-column>
        <el-table-column label="时间" prop="time"></el-table-column>
        <el-table-column label="操作" width="66px">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeComment(scope.row.cmid)"></el-button>
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
      select: '',
      input: '',
      queryInfo: {
        pagenum: 1,
        pagesize: 5
      },
      commentList: [],
      total: 0
    }
  },
  methods: {
    async getCommentList () {
      this.queryInfo = this.$options.data().queryInfo
      if (this.select !== '' && this.input !== '') {
        this.$set(this.queryInfo, this.select, this.input)
      }
      const { data: res } = await this.$http.get('comment/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.commentList = res.data[0]
      this.total = res.data[1][0].total
    },
    async removeComment (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('取消删除')
      const { data: res } = await this.$http.delete(`comment/delete/${id}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getCommentList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCommentList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCommentList()
    }
  },
  created () {
    this.getCommentList()
  }
}
</script>

<style lang="scss" scoped>
.comment {
  .el-card {
    margin: 0;
    .el-select {
      width: 130px;
    }
    .el-table,
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>
