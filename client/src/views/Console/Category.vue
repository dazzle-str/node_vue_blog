<template>
  <div class="category">
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateDialogVisible = true">添加分类</el-button>
        </el-col>
      </el-row>

      <el-table :data="categoryList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditCateDialog(scope.row.cid)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCate(scope.row.cid)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="30%" @close="addCateDialogClosed">
      <!-- 添加分类的表单 -->
      <el-form :model="addCateForm" :rules="addCateRules" ref="addCateRef" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addCateForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类的对话框 -->
    <el-dialog title="修改分类" :visible.sync="editCateDialogVisible" width="30%" @close="editCateDialogClosed">
      <el-form :model="editCateForm" :rules="editCateRules" ref="editCateRef" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="editCateForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryList: [],
      addCateDialogVisible: false,
      addCateForm: {
        name: ''
      },
      addCateRules: {
        name: [{ required: true, message: '请输入分类名称' }]
      },
      editCateDialogVisible: false,
      editCateForm: {},
      editCateRules: {
        name: [{ required: true, message: '请输入分类名称' }]
      }
    }
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get('category/list')
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.categoryList = res.data
    },
    addCateDialogClosed () {
      this.$refs.addCateRef.resetFields()
    },
    addCate () {
      this.$refs.addCateRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('category/add', this.addCateForm)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.addCateDialogVisible = false
        this.getCateList()
      })
    },
    async showEditCateDialog (id) {
      const { data: res } = await this.$http.get(`category/detail/${id}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.editCateForm = res.data
      this.editCateDialogVisible = true
    },
    editCateDialogClosed () {
      this.$refs.editCateRef.resetFields()
    },
    editCate () {
      this.$refs.editCateRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('category/update', this.editCateForm)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.editCateDialogVisible = false
        this.getCateList()
      })
    },
    async removeCate (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('取消删除')
      const { data: res } = await this.$http.delete(`category/delete/${id}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getCateList()
    }
  },
  created () {
    this.getCateList()
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 0;
  .el-table {
    margin-top: 20px;
  }
}
</style>
