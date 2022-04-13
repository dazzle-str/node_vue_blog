<template>
  <el-card>
    <el-table :data="diaryList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="作者" prop="username" width="66px"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date" width="188px"></el-table-column>
      <el-table-column label="操作" width="66px">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDiary(scope.row.did)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background> </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      diaryList: [],
      total: 0
    }
  },
  methods: {
    async getDiaryList () {
      const { data: res } = await this.$http.get('diary/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      this.diaryList = res.data[0]
      this.total = res.data[1][0].total
    },
    async removeDiary (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该日记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('取消删除')
      const { data: res } = await this.$http.delete(`diary/delete/${id}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getDiaryList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getDiaryList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getDiaryList()
    }
  },
  created () {
    this.getDiaryList()
  }
}
</script>

<style>
.el-pagination {
  margin-top: 20px;
}
</style>
