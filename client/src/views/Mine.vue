<template>
  <div class="mine">
    <div class="container">
      <ul class="list">
        <li v-for="item in myarticle" :key="item.aid">
          <div class="article">
            <div class="head">
              <el-link :underline="false" class="title" @click="toDetail(item.aid)">{{ item.title }}</el-link>
              <span class="time">{{ item.pub_date }}</span>
            </div>
            <div class="body">
              <el-image style="width: 160px; height: 90px" :src="item.cover_img" fit="cover"></el-image>
            </div>
            <div class="foot">
              <el-tag size="mini">{{ item.cate_name }}</el-tag>
              <div class="buttons">
                <el-button type="primary" plain size="mini" @click="editArticle(item.aid)">编辑</el-button>
                <el-button type="danger" plain size="mini" @click="removeArticle(item.aid)">删除</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background hide-on-single-page> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 10,
        author_id: ''
      },
      myarticle: [],
      total: 0
    }
  },
  methods: {
    async getMyArticle () {
      const { data: res } = await this.$http.get('article/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      const data = res.data[0]
      data.forEach(item => {
        item.cover_img = 'http://localhost:3000' + item.cover_img
      })
      this.myarticle = data
      this.total = res.data[1][0].total
    },
    toDetail (aid) {
      const routeUrl = this.$router.resolve({
        path: `/article/${aid}`
      })
      window.open(routeUrl.href, '_blank')
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
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCommentList(this.aid)
    }
  },
  created () {
    this.getMyArticle()
  }
}
</script>

<style lang="scss" scoped>
.mine {
  background-color: #eee;
  .container {
    background-color: #fff;
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
      .article {
        padding: 16px 0;
        border-bottom: 1px dotted #ccc;
        margin: 0 24px;
        .head {
          display: flex;
          justify-content: space-between;
          .title {
            font-size: 16px;
          }
          .time {
            color: #999;
            font-size: 14px;
          }
        }
        .body {
          padding: 16px 0;
        }
        .foot {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
