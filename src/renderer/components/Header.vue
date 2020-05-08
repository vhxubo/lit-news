<template>
  <div class="header">
    <ul class="header__btn-group">
      <li
        :class="[idx == index ? 'btn-active' : '']"
        :key="index"
        @click="isActive(index)"
        class="btn btn-default"
        v-for="(item, index) in btnList"
      >{{ item.name }}</li>
    </ul>
  </div>
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
<style lang="scss">
.header {
  display: flex;
  font-size: 2.4rem;
  flex-direction: column;
  border-bottom: 1.5px solid #ebebeb;
  height: 6.5rem;
  justify-content: center;
  user-select: none;

  &__btn-group {
    width: 30%;
    height: 100%;
    display: flex;
    list-style: none;
    align-items: center;
    cursor: pointer;

    @media only screen and (min-width: 1300px) {
      width: 25%;
    }
  }
}
.btn {
  border: none;
  background-color: inherit;
  flex: 1;
  text-align: center;

  &:not(:last-child) {
    border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
  }

  &:hover {
    font-weight: 600;
  }

  &-active {
    font-weight: 600;
  }
}
</style>

