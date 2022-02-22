<template>
  <div class="user">
    <el-card>
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role">
          <template slot-scope="scope">
            <el-select v-model="scope.row.role" size="mini" @change="updateRole(scope.row)">
              <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="updateState(scope.row)"></el-switch>
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
      userList: [],
      roleList: [
        { value: 'normal', label: '用户' },
        { value: 'admin', label: '管理员' }
      ],
      total: 0
    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('user/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.userList = res.data[0]
      this.total = res.data[1][0].total
    },
    async updateRole (user) {
      const { data: res } = await this.$http.put(`user/update/role/${user.uid}`, { role: user.role })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
    },
    async updateState (user) {
      const { data: res } = await this.$http.put(`user/update/state/${user.uid}`, { state: user.state })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
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
    this.getUserList()
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 0;
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
