<template>
  <div>
    <div class="h-128">
      <img class="block w-full h-full object-cover" src="../assets/532-1280x512.jpg" alt="">
    </div>

    <div class="px-20 py-12">
          <div class="h-64 flex rounded-md shadow-md overflow-hidden">
            <div class="h-full w-3/5 px-12 py-8 flex flex-col justify-between">
              <h3 class="font-bold text-3xl">
                <router-link :to="'/article/' + recArt[0].aid">{{ recArt[0].title }}</router-link>
              </h3>
              <!-- <div class="text-gray-500 text-justify content" v-html="recArt[0].content"></div> -->
              <div class="flex justify-between">
                <span class="text-gray-500">{{ recArt[0].pub_date.split(' ')[0] }}</span>
                <span class="font-bold">
                  <router-link :to="'/article/' + recArt[0].aid">Read more</router-link>
                </span>
              </div>
            </div>
            <div class="h-full w-2/5">
              <img class="block w-full h-full object-cover" :src="recArt[0].cover_img" alt="">
            </div>
          </div>

          <div class="mt-12 flex justify-between">
            <div class="w-80 rounded-md shadow-md overflow-hidden">
              <div class="h-48">
                <img class="block w-full h-full object-cover" :src="recArt[1].cover_img" alt="">
              </div>
              <div class="px-7 py-8">
                <h4 class="text-2xl font-bold">
                  <router-link :to="'/article/' + recArt[1].aid">{{ recArt[1].title }}</router-link>
                </h4>
                <!-- <div class="text-justify content" v-html="recArt[1].content"></div> -->
              </div>
            </div>
            <div class="w-80 rounded-md overflow-hidden shadow-md">
              <div class="h-48">
                <img class="block w-full h-full object-cover" :src="recArt[2].cover_img" alt="">
              </div>
              <div class="px-7 py-8">
                <h4 class="text-2xl font-bold">
                  <router-link :to="'/article/' + recArt[2].aid">{{ recArt[2].title }}</router-link>
                </h4>
                <!-- <div class="text-justify content" v-html="recArt[2].content"></div> -->
              </div>
            </div>
            <div class="w-80 rounded-md overflow-hidden shadow-md">
              <div class="h-48">
                <img class="block w-full h-full object-cover" :src="recArt[3].cover_img" alt="">
              </div>
              <div class="px-7 py-8">
                <h4 class="text-2xl font-bold">
                  <router-link :to="'/article/' + recArt[3].aid">{{ recArt[3].title }}</router-link>
                </h4>
                <!-- <div class="text-justify content" v-html="recArt[3].content"></div> -->
              </div>
            </div>
          </div>

          <div class="h-128 mt-12 rounded-md shadow-md overflow-hidden flex">
            <div class="w-5/12 h-full px-12 py-20 flex flex-col justify-between">
              <div class="text-4xl font-bold leading-relaxed content">
                <router-link :to="'/article/' + recArt[4].aid">{{ recArt[4].title }}</router-link>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">{{ recArt[4].pub_date.split(' ')[0] }}</span>
                <span class="font-bold">
                  <router-link :to="'/article/' + recArt[4].aid">Read more</router-link>
                </span>
              </div>
            </div>
            <div class="w-7/12 h-full">
              <img class="block w-full h-full object-cover" :src="recArt[4].cover_img" alt="">
            </div>
          </div>

          <div class="text-right mt-12">
            <el-button type="info" @click="toBlog">See more</el-button>
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
        pagesize: 30
      },
      recArt: []
    }
  },
  methods: {
    async getRecArt () {
      const { data: res1 } = await this.$http.get('recommend/get')
      if (res1.status !== 0) return this.$message.error(res1.message)
      const rec = res1.data.map(item => item.article_id)

      const { data: res2 } = await this.$http.get('article/list', { params: this.queryInfo })
      if (res2.status !== 0) return this.$message.error(res2.message)
      const art = res2.data[0]

      const recArt = []
      rec.forEach(item => {
        const found = art.find(element => element.aid === item)
        recArt.push(found)
      })
      recArt.forEach(item => {
        item.cover_img = this.$store.state.baseURL + item.cover_img
      })
      this.recArt = recArt
    },
    toBlog () {
      this.$router.push('/article')
    }
  },
  created () {
    this.getRecArt()
  }
}
</script>

<style scoped>
.content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.h-128 {
  height: 32rem;
}
</style>
