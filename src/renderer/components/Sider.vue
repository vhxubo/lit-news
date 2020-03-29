<template>
  <div>
    <ul class="list-group">
      <li
        :class="[idx == index?'active':'']"
        :key="index"
        @click="isActive(index)"
        class="list-group-item"
        v-for="(item,index) in newsList"
      >
        <div class="media-body">
          <strong>{{item.title}}</strong>
          <p>{{item.pubDate}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import News from '@/services/news'
export default {
  data () {
    return {
      idx: -1,
      newsList: []
    }
  },
  mounted () {
    this.$bus.$on('g-news-url', newsUrl => {
      this.newsList = []
      const list = News.getNews(newsUrl)
      list
        .then(result => {
          console.log(result)
          result.sort(function (a, b) {
            return Date.parse(b.pubDate) - Date.parse(a.pubDate)
          })
          this.newsList = result
          this.idx = -1
        })
    })
  },
  methods: {
    isActive (index) {
      this.idx = index
      const newsPost = this.newsList[index]
      this.$bus.$emit('g-news-post', newsPost)
    }
  }
}
</script>

<style></style>
