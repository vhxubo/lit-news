<template>
  <header class="toolbar toolbar-header">
    <h1 class="title">{{ btnList[idx].name }}</h1>
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

      <div class="btn-group pull-right">
        <button @click="getAbout" class="btn btn-default">
          <span class="icon icon-info"></span>
        </button>
        <button @click="openGithub" class="btn btn-default">
          <span class="icon icon-github"></span>
        </button>
      </div>
    </div>
  </header>
</template>
<script>
import pkg from '../../../package.json'
export default {
  data () {
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
    isActive (index) {
      this.idx = index
      const newsUrl = this.btnList[index].url
      this.$bus.$emit('g-news-url', newsUrl)
    },
    getAbout () {
      const version = pkg.version
      this.$electron.remote.dialog.showMessageBox({
        title: 'LitNews',
        message: '洛理新闻客户端',
        detail: `Version: ${version}\nAuthor: Vhxubo\nGithub: https://github.com/vhxubo/lit-news`
      })
    },
    openGithub () {
      this.$electron.remote.shell.openExternal('https://github.com/vhxubo/lit-news')
    }
  },
  mounted () {
    this.$nextTick(function () {
      const newsUrl = this.btnList[0].url
      this.$bus.$emit('g-news-url', newsUrl)
    })
  }
}
</script>
<style scoped>
</style>
