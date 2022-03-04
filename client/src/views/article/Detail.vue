<template>
  <div class="detail">
    <div class="container main">
      <div class="article">
        <h1>{{ articleInfo.title }}</h1>
        <div class="others">
          <div class="author">{{ articleInfo.author_name }}</div>
          <div class="date">{{ articleInfo.pub_date }}</div>
        </div>
        <div v-html="articleInfo.content" class="content"></div>
      </div>
      <hr>
      <div class="comment">
        <h3>{{ total === 0 ? '参与评论' : total + '条评论' }}</h3>
        <div class="add">
          <div class="avatar">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
          </div>
          <div class="textarea">
            <el-input type="textarea" v-model="newComment"></el-input>
          </div>
          <div class="button">
            <el-button type="primary" round @click="addComment">评论</el-button>
          </div>
        </div>
        <ul>
          <li class="list" v-for="(item, index) in commentList" :key="index">
            <div class="avatar">
              <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
            </div>
            <div class="text">
              <div class="head">
                <div class="name">{{ item.username }}</div>
                <div class="time">{{ item.time }}</div>
              </div>
              <div class="body">{{ item.content }}</div>
            </div>
          </li>
        </ul>
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background hide-on-single-page> </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aid: {}
  },
  data () {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      articleInfo: {},
      commentList: [],
      newComment: '',
      total: 0
    }
  },
  methods: {
    async getArticleDetail (aid) {
      const { data: res } = await this.$http.get(`article/detail/${aid}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.articleInfo = res.data
    },
    async getCommentList (aid) {
      const { data: res } = await this.$http.get('comment/list', { params: { article_id: aid, ...this.queryInfo } })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.commentList = res.data[0]
      this.total = res.data[1][0].total
    },
    async addComment () {
      const { data: res } = await this.$http.post('comment/add', { content: this.newComment, article_id: this.aid })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.newComment = ''
      this.getCommentList(this.aid)
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCommentList(this.aid)
    }
  },
  created () {
    this.getArticleDetail(this.aid)
    this.getCommentList(this.aid)
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 50px 0;
  .article {
    .others {
      display: flex;
      justify-content: space-between;
      color: #999;
    }
    .content {
      text-align: justify;
    }
  }
  .comment {
    .add {
      display: flex;
      align-items: center;
      .textarea {
        flex: 1;
        margin: 0 20px;
      }
    }
    .list {
      display: flex;
      padding: 10px 0;
      .avatar {
        padding-right: 10px;
      }
      .text {
        flex: 1;
        border-bottom: 1px solid #eee;
        .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 28px;
          .name {
            color: #666;
            font-size: 20px;
          }
          .time {
            color: #999;
            font-size: 14px;
          }
        }
        .body {
          padding: 20px 0;
        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
