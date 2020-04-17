<template>
  <header class="toolbar toolbar-header">
    <div class="toolbar-actions">
      <div class="btn-group">
        <button
          :class="[idx == index ? 'active' : '']"
          :key="index"
          @click="isActive(index)"
          class="btn btn-default"
          v-for="(item, index) in btnList"
        >{{ item.name }}</button>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      idx: 0,
      btnList: [
        { name: '教务处', url: 'https://www.lit.edu.cn/jwc/' },
        { name: '新闻中心', url: 'https://www.lit.edu.cn/' },
        { name: '团委', url: 'https://www.lit.edu.cn/tw/' }
      ]
    }
  },
  methods: {
    isActive(index) {
      this.idx = index
      const newsUrl = this.btnList[index].url
      this.$bus.$emit('g-news-url', newsUrl)
    }
  },
  mounted() {
    this.$nextTick(function() {
      const newsUrl = this.btnList[0].url
      this.$bus.$emit('g-news-url', newsUrl)
    })
  }
}
</script>
<style scoped>
</style>
