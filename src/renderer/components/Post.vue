<template>
  <div @click.right="openMenu" class="content">
    <h3>{{newsPost.title}}</h3>
    <div class="post" v-html="newsPost.post"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsPost: ''
    }
  },
  mounted() {
    this.$bus.$on('g-news-post', newsPost => {
      this.newsPost = newsPost
    })
  },
  methods: {
    openMenu() {
      const newsPost = this.newsPost
      if (newsPost !== '') {
        const remote = this.$electron.remote
        const { Menu, MenuItem } = remote
        const menu = new Menu()
        menu.append(
          new MenuItem({
            label: '复制',
            role: 'copy',
            type: 'normal'
          })
        )
        menu.append(
          new MenuItem({
            label: '分享',
            type: 'submenu',
            submenu: [
              {
                label: '链接',
                click() {
                  remote.clipboard.writeText(`${newsPost.link}`)
                  let myNotification = new Notification('LitNews', {
                    body: '文章链接已写入剪贴板'
                  })
                  myNotification.onclick = () => {
                    console.log('通知被点击')
                  }
                }
              },
              {
                label: '标题 + 链接',
                click() {
                  remote.clipboard.writeText(
                    `${newsPost.title}\n${newsPost.link}`
                  )
                  let myNotification = new Notification('LitNews', {
                    body: '文章标题 + 链接已写入剪贴板'
                  })
                  myNotification.onclick = () => {
                    console.log('通知被点击')
                  }
                }
              }
            ]
          })
        )
        menu.append(
          new MenuItem({
            label: '使用浏览器打开',
            click() {
              remote.shell.openExternal(newsPost.link)
            }
          })
        )
        menu.popup({
          window: remote.getCurrentWindow()
        })
      }
    }
  }
}
</script>
<style scoped>
.content {
  padding: 0 20px;
}

.post >>> * {
  -moz-user-select: text !important;
  -webkit-user-select: text !important;
  -ms-user-select: text !important;
  user-select: text !important;
  cursor: text !important;
  line-height: 1.8;
  letter-spacing: 0.5px;
}

.post >>> img.img_vsb_content {
  width: 100%;
  height: 100%;
}
</style>