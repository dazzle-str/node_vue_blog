<template>
  <div class="detail">
    <div class="container">
      <h1>{{ articleInfo.title }}</h1>
      <div v-html="articleInfo.content"></div>
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
      articleInfo: {}
    }
  },
  methods: {
    async getArticleDetail (aid) {
      const { data: res } = await this.$http.get(`article/detail/${aid}`)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.articleInfo = res.data
    }
  },
  created () {
    this.getArticleDetail(this.aid)
  }
}
</script>

<style lang="scss" scoped>
.detail {
  .container {
    max-width: 1240px;
    margin: 0 auto;
  }
}
</style>
