<template>
  <div class="sidebar">
    <ul class="news-list">
      <li
        :class="[idx == index?'active':'']"
        :key="index"
        @click="isActive(index)"
        class="news-list__item"
        v-for="(item,index) in newsList"
      >
        <div class="news-list__item-title">{{item.title}}</div>

        <div class="news-list__item-des" v-if="item.des"></div>
        <div class="news-list__item-date">{{item.pubDate}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import News from '@/services/news'
export default {
  data() {
    return {
      idx: -1,
      newsList: []
    }
  },
  mounted() {
    this.$bus.$on('g-news-url', newsUrl => {
      this.newsList = []
      const list = News.getNews(newsUrl)
      list.then(result => {
        console.log(result)
        result.sort(function(a, b) {
          return Date.parse(b.pubDate) - Date.parse(a.pubDate)
        })
        this.newsList = result
        this.idx = -1
      })
    })
  },
  methods: {
    isActive(index) {
      this.idx = index
      const newsPost = this.newsList[index]
      this.$bus.$emit('g-news-post', newsPost)
    }
  }
}
</script>

<style lang="scss">
.news-list {
  list-style: none;
  font-size: 2.8rem;

  &__item {
    padding: 1.8rem 2rem;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 1px solid #eeebed;
      margin-right: 1px;
    }

    &:hover {
      background: #dedddb;
    }
  }

  &__item-title {
    font-weight: 600;
    padding-bottom: 1rem;
  }

  &__item-des {
    padding-bottom: 1rem;
    font-size: 1.8rem;
  }

  &__item-date {
    font-size: 2.6rem;
  }
}
</style>
