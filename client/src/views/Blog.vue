<template>
  <div class="p-20">
    <div class="flex flex-wrap justify-between">
      <div class="w-full lg:w-96 xl:w-80 mb-20 rounded-md shadow-md overflow-hidden" v-for="item in articleList" :key="item.aid">
        <div class="h-48">
          <img class="block w-full h-full object-cover" :src="item.cover_img" alt="">
        </div>
        <div class="p-6">
          <div class="font-bold text-sm text-purple-600">{{ item.cate_name }}</div>
          <div class="mt-2 mb-3 text-xl font-bold truncate">
            <router-link :to="'/article/' + item.aid">{{ item.title }}</router-link>
          </div>
          <div class="text-sm">
            <div class="font-bold">{{ item.author_name}}</div>
            <div class="text-gray-500">{{ item.pub_date.split(' ')[0] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 30,
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
        item.cover_img = this.$store.state.baseURL + item.cover_img
      })
      this.articleList = data
    }
  },
  created () {
    this.getArticleList()
  }
}
</script>

<style>
</style>
