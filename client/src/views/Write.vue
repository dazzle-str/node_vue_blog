<template>
  <div class="write p-4 md:p-16">
    <div class="p-4">
      <h2 class="text-xl">写日记</h2>
    </div>
    <el-input type="textarea" :autosize="{ minRows: 4 }" placeholder="记录一天的心情……" v-model="content"></el-input>
    <div class="text-right pt-4">
      <el-button type="info" :disabled="!content" @click="post">发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async post () {
      const { data: res } = await this.$http.post('diary/add', { content: this.content })
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
    }
  }
}
</script>

<style>
.write {
  min-height: calc(100vh - 89px);
}

@media screen and (min-width: 768px) {
  .write {
    min-height: calc(100vh - 153px);
  }
}
</style>
