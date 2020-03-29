<template>
  <div class="typo">
    <h3>{{newsPost.title}}</h3>
    <div v-html="newsPost.post" @click.right="test"></div>
  </div>
</template>
<script>
// const { Menu, MenuItem } = this.$electron.remote
// const menu = new Menu()
// menu.append(new MenuItem({ label: 'MenuItem1', click () { console.log('item 1 clicked') } }))
// menu.append(new MenuItem({ type: 'separator' }))
// menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))
export default {
  data () {
    return {
      newsPost: ''
    }
  },
  mounted () {
    this.$bus.$on('g-news-post', newsPost => {
      this.newsPost = newsPost
    })
  },
  methods: {
    test () {
      window.open(this.newsPost.link)
    }
  }
}
</script>
<style scoped>
.typo {
  width: 100%;
  height: 100%;
  padding: 15px 25px;
  color: #333;
  background: #fff;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-rendering: optimizelegibility;
  font: 300 1em/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei,
    Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
}

.typo >>> h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei,
    Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
  font-weight: 100;
  color: #000;
  line-height: 1.35;
}
/* 让链接在 hover 状态下显示下划线 */
.typo >>> a {
  color: #1abc9c;
}

.typo >>> a:hover {
  text-decoration: none;
}

.typo >>> a {
  text-decoration: none;
  border-bottom: 1px solid #1abc9c;
}

.typo >>> a:hover {
  border-bottom-color: #555;
  color: #555;
}

/* 保证块/段落之间的空白隔行 */
.typo >>> p,
.typo pre,
.typo ul,
.typo ol,
.typo dl,
.typo form,
.typo hr,
.typo table,
blockquote {
  margin: 0;
  padding: 0;
  margin-bottom: 1.2em;
}

.typo >>> img {
  max-width: 100%;
}
</style>