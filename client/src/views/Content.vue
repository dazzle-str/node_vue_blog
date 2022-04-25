<template>
  <div class="mine p-4 md:p-16">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已发布" name="published">
        <ul>
          <li v-for="item in published" :key="item.aid">
            <div class="py-4 md:py-6 border-b border-dotted">
              <div class="flex justify-between items-center">
                <el-link :underline="false">
                  <router-link class="text-xs md:text-base" :to="'/article/' + item.aid">{{ item.title }}</router-link>
                </el-link>
                <span class="text-xs md:text-base text-gray-400">{{ item.pub_date.split('.')[0] }}</span>
              </div>
              <div class="w-32 md:w-64 h-16 md:h-36 my-3 md:my-4">
                <img class="block w-full h-ull object-cover" :src="item.cover_img" alt="">
              </div>
              <div class="flex justify-between items-end">
                <el-tag size="mini">{{ item.cate_name }}</el-tag>
                <div>
                  <el-button type="primary" plain size="mini" @click="editArticle(item.aid)">编辑</el-button>
                  <el-button type="danger" plain size="mini" @click="removeArticle(item.aid)">删除</el-button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="draftbox">
        <ul>
          <li v-for="item in draftbox" :key="item.aid">
            <div class="py-4 md:py-6 border-b border-dotted">
              <div class="flex justify-between items-center">
                <el-link :underline="false">
                  <router-link class="text-xs md:text-base" :to="'/article/' + item.aid">{{ item.title }}</router-link>
                </el-link>
                <span class="text-xs md:textbase text-gray-400">{{ item.pub_date.split('.')[0] }}</span>
              </div>
              <div class="w-32 md:w-64 h-16 md:h-36 my-3 md:my-4">
                <img class="block w-full h-ull object-cover" :src="item.cover_img" alt="">
              </div>
              <div class="flex justify-between items-end">
                <el-tag size="mini">{{ item.cate_name }}</el-tag>
                <div>
                  <el-button type="primary" plain size="mini" @click="editArticle(item.aid)">编辑</el-button>
                  <el-button type="danger" plain size="mini" @click="removeArticle(item.aid)">删除</el-button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'published',
      queryInfo: {
        pagenum: 1,
        pagesize: 10,
        author_id: ''
      },
      published: [],
      draftbox: [],
      total: 0
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async getMyArticle () {
      const { data: res } = await this.$http.get('article/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      const data = res.data[0]
      data.forEach(item => {
        item.cover_img = this.$store.state.baseURL + item.cover_img
      })
      this.myarticle = data
      this.published = data.filter(item => item.state === '已发布')
      this.draftbox = data.filter(item => item.state === '草稿')
      this.total = res.data[1][0].total
    },
    editArticle (aid) {
      this.$router.push(`/create/${aid}`)
    },
    async removeArticle (aid) {
      const confirmResult = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('取消删除')
      const { data: res } = await this.$http.delete(`article/delete/${aid}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getMyArticle()
    }
  },
  created () {
    this.queryInfo.author_id = this.$store.state.user.uid
    this.getMyArticle()
  }
}
</script>

<style>
.mine {
  min-height: calc(100vh - 89px)
}

@media screen and (min-width: 768px) {
  .mine {
    min-height: calc(100vh - 153px);
  }
}

.el-tabs__header {
  margin: 0;
}
</style>
