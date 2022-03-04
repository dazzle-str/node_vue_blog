<template>
  <div class="main">
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="item in articleList" :key="item.aid">
          <el-card shadow="hover" @click.native="toDetail(item.aid)">
            <el-image style="width: 100%; height: 146.5px" :src="item.cover_img" fit="cover"></el-image>
            <div style="padding: 14px;">
              <span>{{ item.title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.pub_date.split(' ')[0] }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
        state: '已发布'
      },
      articleList: []
    }
  },
  methods: {
    async getArticleList () {
      const { data: res } = await this.$http.get('article/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      const data = res.data[0]
      data.forEach(item => {
        item.cover_img = 'http://localhost:3000' + item.cover_img
      })
      this.articleList = data
      this.$message.success(res.message)
    },
    toDetail (aid) {
      const routeUrl = this.$router.resolve({
        path: `/article/${aid}`
      })
      window.open(routeUrl.href, '_blank')
    }
  },
  created () {
    this.getArticleList()
  }
}
</script>

<style>
.el-card {
  margin: 20px 0;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
