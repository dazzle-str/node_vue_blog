<template>
  <div class="diary p-4 md:p-16">
    <ul>
      <li v-for="item in diaryList" :key="item.did">
        <div class="text-gray-500 bg-yellow-100 p-2 md:p-8 mb-4 md:mb-16 rounded-md shadow-md overflow-hidden">
          <span class="text-xs md:text-base">{{ item.username }}</span>
          <div class="text-sm md:text-lg text-justify text-black my-1 md:my-4 fold" :id="item.did">{{ item.content }}</div>
          <div class="flex justify-between">
            <span class="text-xs md:text-base">{{ item.pub_date.split(' ')[0] }}</span>
            <span class="text-xs md:text-base text-blue-500 cursor-pointer" @click="toggle(item.did)">{{ unfold.includes(item.did) ? '收起' : '展开' }}</span>
          </div>
        </div>
      </li>
    </ul>
    <p>谢谢你能看到这里！！</p>
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
      diaryList: [],
      unfold: []
    }
  },
  methods: {
    async getDiaryList () {
      const { data: res } = await this.$http.get('diary/list', { params: this.queryInfo })
      if (res.status !== 0) return this.$message.error(res.message)
      this.diaryList = res.data[0]
    },
    toggle (id) {
      const content = document.getElementById(id)
      content.classList.toggle('fold')
      if (this.unfold.includes(id)) {
        this.unfold = this.unfold.filter(item => item !== id)
      } else {
        this.unfold.push(id)
      }
    }
  },
  created () {
    this.getDiaryList()
  }
}
</script>

<style>
.diary {
  min-height: calc(100vh - 89px);
}

@media screen and (min-width: 768px) {
  .diary {
    min-height: calc(100vh - 153px);
  }
}

.fold {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
